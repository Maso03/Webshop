import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer
import { orders } from "./orders"; // Importiere die Referenz-Tabelle für Bestellungen
import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/sqlite-core";

export const orderHistory = sqliteTable(
  "orderHistory",
  {
    historyID: integer("historyID").primaryKey(),
    userID: text("userID").notNull(),
    orderID: integer("orderID")
      .references(() => orders.orderID)
      .notNull(),
    status: text("status"),
    date: text("date")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (orderHistory) => {
    return {
      userIdIndex4: index("userIdIndex4").on(orderHistory.userID),
      orderIdIndex1: index("orderIdIndex1").on(orderHistory.orderID),
    };
  }
);
