import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { products as productTable } from "../../db/schema/products";
import { eq } from "drizzle-orm";

const productSchema = z.object({
  id: z.number().int().positive().min(1),
  productName: z.string().min(2).max(255),
  price: z.string(),
  categoryID: z.number().int().positive().min(1),
});

type Products = z.infer<typeof productSchema>;

const createPostSchema = productSchema.omit({ id: true });

export const productsRoute = new Hono()
  .get("/", async (c) => {
    const products = await db.select().from(productTable);

    return c.json({ products: products });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const product = await c.req.valid("json");

    const result = await db
      .insert(productTable)
      .values({
        ...product,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.productID, id));

    if (!product) {
      return c.notFound();
    }
    return c.json({ product });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(productTable)
      .where(eq(productTable.productID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedProduct = await db
      .delete(productTable) // Add the table name as an argument
      .where(eq(productTable.productID, id))
      .returning();

    return c.json({ product: deletedProduct });
  })
  .put("/:id{[0-9]+}", zValidator("json", productSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const product = await c.req.valid("json");

    const updatedProduct = await db
      .update(productTable)
      .set(product)
      .where(eq(productTable.productID, id))
      .returning();

    return c.json({ product: updatedProduct });
  });
