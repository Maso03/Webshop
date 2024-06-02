import {
  sqliteTable,
  text,
  integer,
  numeric,
  blob,
  index,
} from "drizzle-orm/sqlite-core";
import { productCategories } from "./productCategories.ts";

export const products = sqliteTable(
  "products",
  {
    productID: integer("productID").primaryKey(),
    productName: text("productName").notNull(),
    description: text("description"),
    price: numeric("price").notNull(),
    availability: integer("availability"),
    categoryID: integer("categoryID")
      .references(() => productCategories.categoryID)
      .notNull(),
    image: blob("image"), // Hinzufügen der BLOB-Spalte
  },
  (products) => {
    return {
      categoryIdIndex: index("categoryIdIndex").on(products.categoryID),
    };
  }
);
