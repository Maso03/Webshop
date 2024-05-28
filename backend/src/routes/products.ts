import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { products as productTable } from "../../db/schema/products";

const productSchema = z.object({
  id: z.number().int().positive().min(1),
  productName: z.string().min(2).max(255),
  price: z.string(),
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
  });
/*.get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const product = fakeProducts.find((product) => product.id === id);
    if (!product) {
      return c.notFound();
    }
    return c.json({ product });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeProducts.findIndex((product) => product.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedProduct = fakeProducts.splice(index, 1)[0];
    return c.json({ product: deletedProduct });
  });*/
// .put
