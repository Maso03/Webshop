import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer

export const shoppingCart = sqliteTable("shoppingCart", {
  cartID: integer("cartID").primaryKey(),
  userID: integer("userID")
    .references(() => users.userID)
    .notNull(),
});
