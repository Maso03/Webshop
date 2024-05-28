import { sqliteTable, text, integer, numeric } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer
import { sql } from "drizzle-orm";

export const orders = sqliteTable("orders", {
  orderID: integer("orderID").primaryKey(),
  userID: integer("userID")
    .references(() => users.userID)
    .notNull(),
  orderDate: text("orderDate")
    .notNull()
    .default(sql`(current_timestamp)`), // timestamp als Text gespeichert
  totalPrice: integer("totalPrice").notNull(),
  shippingAddress: text("shippingAddress").notNull(),
  paymentStatus: text("paymentStatus").notNull(),
});
