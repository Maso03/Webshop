import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { orderHistory as orderHistoryTable } from "../../db/schema/orderHistory";
import { orders as ordersTable } from "../../db/schema/orders";
import { cartItems as cartItemsTable } from "../../db/schema/cartItems";
import { products as productTable } from "../../db/schema/products";
import { eq } from "drizzle-orm";
import { orderPositions as orderPositionsTable } from "../../db/schema/orderPositions";

const orderHistorySchema = z.object({
  historyID: z.number().int().positive().min(1),
  userID: z.string().min(2),
  orderID: z.number().int().positive().min(1),
  status: z.string().optional(),
  date: z.string(),
});

type OrderHistory = z.infer<typeof orderHistorySchema>;

const createPostSchema = orderHistorySchema.omit({ historyID: true });

export const orderHistoryRoute = new Hono()
  .get("/", async (c) => {
    const orderHistory = await db
      .select({
        historyID: orderHistoryTable.historyID,
        userID: orderHistoryTable.userID,
        orderID: orderHistoryTable.orderID,
        status: orderHistoryTable.status,
        date: orderHistoryTable.date,
        productID: orderPositionsTable.productID,
        productName: productTable.productName,
        price: productTable.price,
        quantity: orderPositionsTable.quantity,
      })
      .from(orderHistoryTable)
      .innerJoin(
        ordersTable,
        eq(orderHistoryTable.orderID, ordersTable.orderID)
      )
      .innerJoin(
        orderPositionsTable,
        eq(ordersTable.orderID, orderPositionsTable.orderID)
      )
      .innerJoin(
        productTable,
        eq(orderPositionsTable.productID, productTable.productID)
      );

    const formattedOrderHistory = [];
    for (const order of orderHistory) {
      const historyIndex = formattedOrderHistory.findIndex(
        (h) => h.historyID === order.historyID
      );
      if (historyIndex === -1) {
        formattedOrderHistory.push({
          historyID: order.historyID,
          userID: order.userID,
          orderID: order.orderID,
          status: order.status,
          date: order.date,
          items: [
            {
              productID: order.productID,
              productName: order.productName,
              price: order.price,
              quantity: order.quantity,
            },
          ],
        });
      } else {
        formattedOrderHistory[historyIndex].items.push({
          productID: order.productID,
          productName: order.productName,
          price: order.price,
          quantity: order.quantity,
        });
      }
    }

    return c.json({ orderHistory: formattedOrderHistory });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const newOrderHistory = await c.req.valid("json");

    const result = await db
      .insert(orderHistoryTable)
      .values({
        ...newOrderHistory,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const orderHistory = await db
      .select()
      .from(orderHistoryTable)
      .where(eq(orderHistoryTable.historyID, id));

    if (!orderHistory) {
      return c.notFound();
    }
    return c.json({ orderHistory });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(orderHistoryTable)
      .where(eq(orderHistoryTable.historyID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedOrderHistory = await db
      .delete(orderHistoryTable)
      .where(eq(orderHistoryTable.historyID, id))
      .returning();

    return c.json({ orderHistory: deletedOrderHistory });
  });
