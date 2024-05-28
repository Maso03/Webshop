import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer

export const shippingAddresses = sqliteTable("shippingAddresses", {
  addressID: integer("addressID").primaryKey(),
  userID: integer("userID")
    .references(() => users.userID)
    .notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postalCode").notNull(),
  country: text("country").notNull(),
});
