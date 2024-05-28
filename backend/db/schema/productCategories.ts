import {
  sqliteTable,
  text,
  integer,
  numeric,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// Produktkategorien Tabelle
export const productCategories = sqliteTable(
  "productCategories",
  {
    categoryID: integer("CategoryID").primaryKey(),
    categoryName: text("CategoryName"),
    description: text("Description"),
  },
  (productCategories) => ({
    nameIdx: uniqueIndex("nameIdx").on(productCategories.categoryName),
  })
);
