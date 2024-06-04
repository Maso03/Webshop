import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { or, sql } from "drizzle-orm";
import { index } from "drizzle-orm/sqlite-core";
import { orders } from "./orders";

export const orderHistory = sqliteTable(
  "orderHistory",
  {
    historyID: integer("historyID").primaryKey(),
    userID: text("userID").notNull(),
    orderID: integer("orderID")
      .references(() => orders.ordersID)
      .notNull(),
    status: text("status"),
    date: text("date")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (orderHistory) => {
    return {
      userIdIndex5: index("userIdIndex5").on(orderHistory.userID),
      orderPosiitonIdIndex1: index("orderPositionIdIndex1").on(
        orderHistory.orderID
      ),
    };
  }
);
