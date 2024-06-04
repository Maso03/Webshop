import { Hono, type Context, type Next } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { shoppingCart as shoppingCartTable } from "../../db/schema/shoppingCart";
import { products as productTable } from "../../db/schema/products";
import { cartItems as cartItemsTable } from "../../db/schema/cartItems";
import { eq } from "drizzle-orm";
import { getUser, kindeClient, sessionManager } from "../kinde";
import { shippingAddresses } from "../../db/schema/shippingAddresses";

// Middleware zur Überprüfung der Benutzerauthentifizierung
const checkIsAuthenticated = async (c: Context, next: Next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      // Benutzer ist nicht authentifiziert, leiten Sie ihn zur Anmeldeseite um
      return c.redirect("/api/login");
    }

    // Benutzer ist authentifiziert, speichern Sie die Benutzer-ID in der Anforderung
    const user = await kindeClient.getUserProfile(manager);
    c.set("userId", user.id);

    await next();
  } catch (error) {
    console.error("Error checking authentication:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export { checkIsAuthenticated };

const shoppingcart = z.object({
  cartItemID: z.number().int().positive(),
  cartID: z.number().int().positive(),
  productID: z.number().int().positive(),
  quantity: z.number().int().positive().min(1),
});

const createPostSchema = shoppingcart.omit({ cartItemID: true });

export const shoppingCartRoute = new Hono()
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const cartshopping = await c.req.valid("json");

    // Erstellen Sie das Warenkorb-Element mit den Produktdaten
    const result = await db
      .insert(cartItemsTable)
      .values({
        ...cartshopping,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })

  .get("/", getUser, async (c) => {
    const user = c.var.user;

    // Führen Sie eine Verknüpfung zwischen den Tabellen "cartItems", "products" und "shoppingCart" durch
    // und wählen Sie die benötigten Daten aus, einschließlich der zusätzlichen Produktdaten
    const carts = await db
      .select({
        cartID: shoppingCartTable.cartID,
        productID: cartItemsTable.productID,
        productName: productTable.productName,
        productPrice: productTable.price, // Hinzufügen der price-Spalte
        productDescription: productTable.description, // Hinzufügen der description-Spalte
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
      .where(eq(shoppingCartTable.userID, user.id));

    // Formatieren Sie die Daten, um ein Array von Warenkörben zu erhalten,
    // das die zusätzlichen Produktdaten enthält
    const formattedCarts = [];
    for (const cart of carts) {
      const cartIndex = formattedCarts.findIndex(
        (c) => c.cartID === cart.cartID
      );
      if (cartIndex === -1) {
        formattedCarts.push({
          cartID: cart.cartID,
          items: [
            {
              productID: cart.productID,
              productName: cart.productName,
              productPrice: cart.productPrice, // Hinzufügen der price-Eigenschaft
              productDescription: cart.productDescription, // Hinzufügen der description-Eigenschaft
              quantity: cart.quantity,
            },
          ],
        });
      } else {
        formattedCarts[cartIndex].items.push({
          productID: cart.productID,
          productName: cart.productName,
          productPrice: cart.productPrice, // Hinzufügen der price-Eigenschaft
          productDescription: cart.productDescription, // Hinzufügen der description-Eigenschaft
          quantity: cart.quantity,
        });
      }
    }

    return c.json({ carts: formattedCarts });
  })

  .delete("/:cartItemId", async (c) => {
    const cartItemId = Number.parseInt(c.req.param("cartItemId"));
    const deletedItem = await db
      .delete(cartItemsTable)
      .where(eq(cartItemsTable.cartItemID, cartItemId))
      .returning();

    if (!deletedItem) {
      return c.notFound();
    }

    return c.json({
      message: "Produkt erfolgreich aus dem Warenkorb entfernt",
      deletedItem,
    });
  })
  .put("/:cartItemId", zValidator("json", shoppingcart), async (c) => {
    const cartItemId = Number.parseInt(c.req.param("cartItemId"));
    const updatedCartItem = await c.req.valid("json");

    const updatedItem = await db
      .update(cartItemsTable)
      .set({ quantity: updatedCartItem.quantity })
      .where(eq(cartItemsTable.cartItemID, cartItemId))
      .returning();

    if (!updatedItem) {
      return c.notFound();
    }

    return c.json({
      message: "Anzahl der Produkte im Warenkorb erfolgreich aktualisiert",
      updatedItem,
    });
  });
