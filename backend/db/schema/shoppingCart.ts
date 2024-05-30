import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // Importiere die Referenz-Tabelle für Benutzer

export const shoppingCart = sqliteTable(
  "shoppingCart",
  {
    cartID: integer("cartID").primaryKey(),
    userID: text("userID").notNull(),
  },
  (shoppingCart) => {
    return {
      userIdIndex3: index("userIdIndex3").on(shoppingCart.userID),
    };
  }
);
