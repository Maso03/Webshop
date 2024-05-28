import {
  sqliteTable,
  text,
  integer,
  numeric,
  index,
} from "drizzle-orm/sqlite-core";
import { productCategories } from "./productCategories.ts"; // Importiere die Referenz-Tabelle für Kategorien

export const products = sqliteTable(
  "products",
  {
    productID: integer("productID").primaryKey(),
    productName: text("productName").notNull(),
    description: text("description"),
    price: numeric("price").notNull(),
    availability: integer("availability"),
    categoryID: integer("categoryID").references(
      () => productCategories.categoryID
    ),
  },
  (products) => {
    return {
      categoryIdIndex: index("categoryIdIndex").on(products.categoryID),
    };
  }
);
