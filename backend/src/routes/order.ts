import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { productCategories as productCategoryTable } from "../../db/schema/productCategories";
import { desc, eq } from "drizzle-orm";
import { products as productTable } from "../../db/schema/products";
import { orders as ordersTable } from "../../db/schema/orders";

const orderSchema = z.object({
  orderID: z.number().int().positive().min(1),
  userID: z.string().min(2),
  orderDate: z.string(),
  totalPrice: z.number().int(),
  addressID: z.number().int().positive().min(1),
  paymentStatus: z.string().min(2),
});

type Orders = z.infer<typeof orderSchema>;

const createPostSchema = orderSchema.omit({ orderID: true });

export const ordersRoute = new Hono()
  .get("/", async (c) => {
    const orders = await db.select().from(ordersTable);

    return c.json({ orders: orders });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const order = await c.req.valid("json");

    const result = await db
      .insert(ordersTable)
      .values({
        ...order,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const order = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.orderID, id));

    if (!order) {
      return c.notFound();
    }
    return c.json({ order });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.orderID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedOrder = await db
      .delete(ordersTable) // Add the table name as an argument
      .where(eq(ordersTable.orderID, id))
      .returning();

    return c.json({ order: deletedOrder });
  });
