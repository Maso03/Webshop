import { Hono, type Context, type Next } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { shoppingCart as shoppingCartTable } from "../../db/schema/shoppingCart";
import {
  cartItems,
  cartItems as cartItemsTable,
} from "../../db/schema/cartItems";
import { orders as orderTable } from "../../db/schema/orders";
import { products as productTable, products } from "../../db/schema/products";
import { eq, sql } from "drizzle-orm";
import { getUser, kindeClient, sessionManager } from "../kinde";
import { shippingAddresses } from "../../db/schema/shippingAddresses";
import { inArray } from "drizzle-orm";

const checkoutSchema = z.object({
  cartID: z.number().int().positive(),
  addressID: z.number().int().positive(),
});

export const orderRoute = new Hono()
  .post("/checkout", getUser, zValidator("json", checkoutSchema), async (c) => {
    try {
      const { addressID } = await c.req.valid("json");
      const user = c.var.user;

      // Abfrage der Artikel im Warenkorb des Benutzers
      const cartItems = await db
        .select({
          cartID: cartItemsTable.cartID,
          productID: cartItemsTable.productID,
          quantity: cartItemsTable.quantity,
          price: productTable.price,
        })
        .from(cartItemsTable)
        .innerJoin(
          shoppingCartTable,
          eq(cartItemsTable.cartID, shoppingCartTable.cartID)
        )
        .where(
          eq(shoppingCartTable.userID, user.id) //user.id
        ) //user.id
        .innerJoin(
          productTable,
          eq(cartItemsTable.productID, productTable.productID)
        );

      if (cartItems.length === 0) {
        return c.json({ error: "No items in the cart" }, 400);
      }

      // Berechnung des Gesamtpreises
      const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      );

      // Erstellung der Bestellung
      await db.insert(orderTable).values({
        addressID: addressID,
        userID: user.id, //user.id
        cartID: cartItems[0].cartID,
        totalPrice: totalPrice,
        orderDate: new Date().toISOString(),
        products: JSON.stringify(
          cartItems.map((item) => ({
            name: item.productID, // Angenommen, Produktname ist durch ID referenziert, kann angepasst werden
            price: item.price,
            amount: item.quantity,
          }))
        ),
      });

      // Löschen der Artikel aus dem Warenkorb nach Bestellung
      await db
        .delete(cartItemsTable)
        .where(eq(cartItemsTable.cartID, cartItems[0].cartID));

      return c.json({ message: "Order processed successfully" }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .get("/orders", getUser, async (c) => {
    try {
      const user = c.var.user;

      // Typdefinition für die Bestellungen
      type Order = {
        ordersID: number;
        userID: string;
        shippingAddress: string;
        city: string;
        postalCode: string;
        country: string;
        totalPrice: number;
        orderDate: string;
        products: { name: number | string; price: number; amount: number }[];
      };

      // Abfrage, um alle Bestellungen des Benutzers abzurufen
      const ordersQuery = await db
        .select({
          ordersID: orderTable.ordersID,
          userID: orderTable.userID,
          shippingAddress: shippingAddresses.address,
          city: shippingAddresses.city,
          postalCode: shippingAddresses.postalCode,
          country: shippingAddresses.country,
          totalPrice: orderTable.totalPrice,
          orderDate: orderTable.orderDate,
          products: orderTable.products,
        })
        .from(orderTable)
        .innerJoin(
          shippingAddresses,
          eq(orderTable.addressID, shippingAddresses.addressID)
        )
        .where(eq(orderTable.userID, user.id));

      if (ordersQuery.length === 0) {
        return c.json({ error: "No orders found for this user" }, 404);
      }

      const uniqueOrders: Order[] = ordersQuery.map((order) => ({
        ordersID: order.ordersID,
        userID: order.userID,
        shippingAddress: order.shippingAddress,
        city: order.city,
        postalCode: order.postalCode,
        country: order.country,
        totalPrice: order.totalPrice,
        orderDate: order.orderDate,
        products: order.products
          ? JSON.parse(order.products)
          : ([] as { name: number; price: number; amount: number }[]),
      }));

      // Alle Produkt-IDs sammeln
      const allProductIds = uniqueOrders.flatMap((order) =>
        order.products.map((product) => product.name as number)
      );
      const productNamesQuery = await db
        .select({
          productID: productTable.productID,
          productName: productTable.productName,
        })
        .from(productTable)
        .where(inArray(productTable.productID, allProductIds));

      const productNameMap = productNamesQuery.reduce(
        (map, product) => {
          map[product.productID] = product.productName;
          return map;
        },
        {} as { [key: number]: string }
      );

      // Produktnamen für jede Bestellung aktualisieren
      for (const order of uniqueOrders) {
        order.products = order.products.map((product) => ({
          ...product,
          name:
            productNameMap[product.name as number] || product.name.toString(), // Replace numeric ID with actual product name
        }));
      }

      return c.json({ orders: uniqueOrders }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .get("/orders/:id", getUser, async (c) => {
    try {
      const user = c.var.user;
      const orderId = parseInt(c.req.param("id"), 10);

      // Typdefinition für die Bestellungen
      type Order = {
        ordersID: number;
        userID: string;
        shippingAddress: string;
        city: string;
        postalCode: string;
        country: string;
        totalPrice: number;
        orderDate: string;
        products: { name: string; price: number; amount: number }[];
      };

      // Abfrage, um Bestellung anhand der ID abzurufen
      const orderQuery = await db
        .select({
          ordersID: orderTable.ordersID,
          userID: orderTable.userID,
          shippingAddress: shippingAddresses.address,
          city: shippingAddresses.city,
          postalCode: shippingAddresses.postalCode,
          country: shippingAddresses.country,
          totalPrice: orderTable.totalPrice,
          orderDate: orderTable.orderDate,
          cartItemID: orderTable.cartID,
        })
        .from(orderTable)
        .innerJoin(
          shippingAddresses,
          eq(orderTable.addressID, shippingAddresses.addressID)
        )
        .where(eq(orderTable.ordersID, orderId));

      if (orderQuery.length === 0) {
        return c.json({ error: "Order not found" }, 404);
      }

      const order = {
        ordersID: orderQuery[0].ordersID,
        userID: orderQuery[0].userID,
        shippingAddress: orderQuery[0].shippingAddress,
        city: orderQuery[0].city,
        postalCode: orderQuery[0].postalCode,
        country: orderQuery[0].country,
        totalPrice: orderQuery[0].totalPrice,
        orderDate: orderQuery[0].orderDate,
        products: [] as { name: string; price: number; amount: number }[],
      };

      // Produkte für die Bestellung abrufen und hinzufügen
      const productsQuery = await db
        .select({
          name: products.productName,
          price: products.price,
          amount: cartItems.quantity,
        })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productID, products.productID))
        .where(eq(cartItems.cartID, order.ordersID));

      // Konvertieren Sie den Preis in eine Zahl, falls nötig
      const formattedProducts = productsQuery.map((product) => ({
        ...product,
        price: Number(product.price),
      }));

      order.products = formattedProducts;

      return c.json({ order: order }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  });
