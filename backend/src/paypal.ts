import { Hono } from "hono";
import { cartItems, cartItems as cartItemsTable } from "../db/schema/cartItems";
import { db } from "../db";
import { shoppingCart as shoppingCartTable } from "../db/schema/shoppingCart";
import { products as productTable } from "../db/schema/products";
import { getUser } from "./kinde";
import { eq } from "drizzle-orm";

async function generateAccessToken(): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
            ),
        },
        body: "grant_type=client_credentials",
      }
    );
    if (!response.ok) {
      throw new Error(`Error generating access token: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Error generating access token");
  }
}

// Call the function and set the response on the context object
export const PaypalAccess = new Hono().post("/paypal", getUser, async (c) => {
  try {
    const token = await generateAccessToken();

    const user = c.var.user;

    const carts = await db
      .select({
        cartID: shoppingCartTable.cartID,
        productID: cartItemsTable.productID,
        productName: productTable.productName,
        productPrice: productTable.price,
        productDescription: productTable.description,
        quantity: cartItemsTable.quantity,
      })
      .from(shoppingCartTable)
      .innerJoin(
        cartItemsTable,
        eq(shoppingCartTable.cartID, cartItemsTable.cartID)
      )
      .innerJoin(
        productTable,
        eq(cartItemsTable.productID, productTable.productID)
      )
      .where(eq(shoppingCartTable.userID, user.id)); //user.id

    if (carts.length === 0) {
      return c.json({ error: "Shopping cart is empty" }, 400);
    }

    // Group items by cartID
    const groupedItems = carts.reduce((acc: any, item) => {
      const {
        cartID,
        productName,
        productPrice,
        productDescription,
        quantity,
      } = item;
      const cartIDStr = cartID.toString(); // Convert cartID to string
      if (!acc[cartIDStr]) {
        acc[cartIDStr] = [];
      }
      acc[cartIDStr].push({
        name: productName,
        description: productDescription,
        unit_amount: {
          currency_code: "EUR",
          value: Number(productPrice).toFixed(2),
        },
        quantity: quantity.toString(),
      });
      return acc;
    }, {});

    // Create purchase_units array
    const purchase_units = Object.keys(groupedItems).map((cartID) => {
      const items = groupedItems[cartID];
      const totalValue = items
        .reduce(
          (sum: number, item: any) =>
            sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity),
          0
        )
        .toFixed(2);
      return {
        items,
        amount: {
          currency_code: "EUR",
          value: totalValue,
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: totalValue,
            },
          },
        },
      };
    });

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units,
          application_context: {
            brand_name: "Webshop",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http:localhost:5173",
            cancel_url: "http:localhost:5173",
          },
        }),
      }
    );
    const data = await response.json();
    const link = data.links.find((link: any) => link.rel === "approve").href;
    console.log(link);
    return c.json({ link });
  } catch (error) {
    console.error("Error generating access token:", error);
    return c.json({ error: "Error generating access token" }, 500);
  }
});
