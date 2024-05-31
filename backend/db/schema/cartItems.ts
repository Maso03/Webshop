import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { shoppingCart } from "./shoppingCart"; // Importiere die Referenz-Tabelle für den Warenkorb
import { products } from "./products"; // Importiere die Referenz-Tabelle für Produkte

export const cartItems = sqliteTable("cartItems", {
  cartItemID: integer("cartItemID").primaryKey(),
  cartID: integer("cartID")
    .references(() => shoppingCart.cartID)
    .notNull(),
  productID: integer("productID")
    .references(() => products.productID)
    .notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unitPrice").notNull(),
});
