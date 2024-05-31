import {
  sqliteTable,
  text,
  integer,
  numeric,
  index,
} from "drizzle-orm/sqlite-core";
import { orders } from "./orders"; // Import the reference table for orders
import { products } from "./products"; // Import the reference table for products

export const orderPositions = sqliteTable(
  "orderPositions",
  {
    orderPositionID: integer("orderPositionID").primaryKey(),
    orderID: integer("orderID")
      .references(() => orders.orderID)
      .notNull(),
    productID: integer("productID")
      .references(() => products.productID)
      .notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unitPrice").notNull(),
  },
  (orderPositions) => {
    return {
      orderIdIndex2: index("orderIdIndex2").on(orderPositions.orderID),
      productIdIndex: index("productIdIndex").on(orderPositions.productID),
    };
  }
);
