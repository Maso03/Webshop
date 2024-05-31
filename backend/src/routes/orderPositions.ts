import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { orders as ordersTable } from "../../db/schema/orders";
import { products as productsTable } from "../../db/schema/products";
import { orderPositions as orderPositionsTable } from "../../db/schema/orderPositions";
import { desc, eq } from "drizzle-orm";

const orderPositionSchema = z.object({
  orderPositionID: z.number().int().positive().min(1),
  orderID: z.number().int().positive().min(1),
  productID: z.number().int().positive().min(1),
  quantity: z.number().int().positive().min(1),
  unitPrice: z.number().int().positive().min(1),
});

type OrderPositions = z.infer<typeof orderPositionSchema>;

const createPostSchema = orderPositionSchema.omit({
  orderPositionID: true,
});

export const orderPositionsRoute = new Hono()
  .get("/", async (c) => {
    // Führen Sie eine JOIN-Abfrage zwischen den Tabellen "orderPositions", "orders" und "products" durch
    // und wählen Sie die benötigten Spalten aus
    const orderPositions = await db
      .select({
        orderPositionID: orderPositionsTable.orderPositionID,
        orderID: orderPositionsTable.orderID,
        productID: orderPositionsTable.productID,
        quantity: orderPositionsTable.quantity,
        unitPrice: orderPositionsTable.unitPrice,
        orderDate: ordersTable.orderDate,
        totalPrice: ordersTable.totalPrice,
        paymentStatus: ordersTable.paymentStatus,
        productName: productsTable.productName,
        productDescription: productsTable.description,
        productPrice: productsTable.price,
        productAvailability: productsTable.availability,
      })
      .from(orderPositionsTable)
      .innerJoin(
        ordersTable,
        eq(orderPositionsTable.orderID, ordersTable.orderID)
      )
      .innerJoin(
        productsTable,
        eq(orderPositionsTable.productID, productsTable.productID)
      );

    return c.json({
      orderPositions: orderPositions,
    });
  })

  .post("/", zValidator("json", createPostSchema), async (c) => {
    const orderPosition = await c.req.valid("json");

    const result = await db
      .insert(orderPositionsTable)
      .values({
        ...orderPosition,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })

  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    // Führen Sie eine JOIN-Abfrage zwischen den Tabellen "orderPositions", "orders" und "products" durch
    // und wählen Sie die benötigten Spalten aus, wobei Sie die Abfrage auf die gewünschte Bestellposition-ID beschränken
    const orderPosition = await db
      .select({
        orderPositionID: orderPositionsTable.orderPositionID,
        orderID: orderPositionsTable.orderID,
        productID: orderPositionsTable.productID,
        quantity: orderPositionsTable.quantity,
        unitPrice: orderPositionsTable.unitPrice,
        orderDate: ordersTable.orderDate,
        totalPrice: ordersTable.totalPrice,
        paymentStatus: ordersTable.paymentStatus,
        productName: productsTable.productName,
        productDescription: productsTable.description,
        productPrice: productsTable.price,
        productAvailability: productsTable.availability,
      })
      .from(orderPositionsTable)
      .innerJoin(
        ordersTable,
        eq(orderPositionsTable.orderID, ordersTable.orderID)
      )
      .innerJoin(
        productsTable,
        eq(orderPositionsTable.productID, productsTable.productID)
      )
      .where(eq(orderPositionsTable.orderPositionID, id));

    if (!orderPosition) {
      return c.notFound();
    }

    return c.json({
      orderPosition: orderPosition,
    });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(orderPositionsTable)
      .where(eq(orderPositionsTable.orderPositionID, id));

    if (!index) {
      return c.notFound();
    }

    const deletedOrderPosition = await db
      .delete(orderPositionsTable)
      .where(eq(orderPositionsTable.orderPositionID, id))
      .returning();

    return c.json({ orderPosition: deletedOrderPosition });
  })

  .put("/:id{[0-9]+}", zValidator("json", orderPositionSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const orderPosition = await c.req.valid("json");

    const updatedOrderPosition = await db
      .update(orderPositionsTable)
      .set(orderPosition)
      .where(eq(orderPositionsTable.orderPositionID, id))
      .returning();

    return c.json({ orderPosition: updatedOrderPosition });
  });
