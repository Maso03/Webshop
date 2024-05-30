import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer

export const shippingAddresses = sqliteTable(
  "shippingAddresses",
  {
    addressID: integer("addressID").primaryKey(),
    userID: text("userID").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postalCode: text("postalCode").notNull(),
    country: text("country").notNull(),
  },
  (shippingAddresses) => {
    return {
      userIdIndex2: index("userIdIndex2").on(shippingAddresses.userID),
    };
  }
);
