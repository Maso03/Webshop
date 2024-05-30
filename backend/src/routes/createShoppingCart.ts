import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { shoppingCart as shoppingCartTable } from "../../db/schema/shoppingCart";
import { eq } from "drizzle-orm";

const shoppingCartSchema = z.object({
  cartID: z.number().int().positive().min(1),
  userID: z.string().min(2),
});

type ShoppingCarts = z.infer<typeof shoppingCartSchema>;

const createPostSchema = shoppingCartSchema.omit({ cartID: true });

export const createShoppingCartRoute = new Hono()
  .get("/", async (c) => {
    const shoppingCarts = await db.select().from(shoppingCartTable);

    return c.json({ shoppingCarts: shoppingCarts });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const shoppingCart = await c.req.valid("json");

    const result = await db
      .insert(shoppingCartTable)
      .values({
        ...shoppingCart,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const shoppingCart = await db
      .select()
      .from(shoppingCartTable)
      .where(eq(shoppingCartTable.cartID, id));

    if (!shoppingCart) {
      return c.notFound();
    }
    return c.json({ shoppingCart });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(shoppingCartTable)
      .where(eq(shoppingCartTable.cartID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedShoppingCart = await db
      .delete(shoppingCartTable) // Add the table name as an argument
      .where(eq(shoppingCartTable.cartID, id))
      .returning();

    return c.json({ shoppingCart: deletedShoppingCart });
  })
  .put("/:id{[0-9]+}", zValidator("json", shoppingCartSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const shoppingCart = await c.req.valid("json");

    const updatedShoppingCart = await db
      .update(shoppingCartTable)
      .set(shoppingCart)
      .where(eq(shoppingCartTable.cartID, id))
      .returning();

    return c.json({ shoppingCart: updatedShoppingCart });
  });
