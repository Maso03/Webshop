import {
  sqliteTable,
  text,
  integer,
  numeric,
  index,
} from "drizzle-orm/sqlite-core";
import { products } from "./products"; // Import the reference table for products
import { cartItems } from "./cartItems";
import { sql } from "drizzle-orm";
import { shippingAddresses } from "./shippingAddresses";
import { shoppingCart } from "./shoppingCart";

export const orders = sqliteTable(
  "orders",
  {
    ordersID: integer("ordersID").primaryKey(),
    userID: text("userID").notNull(),
    cartID: integer("cartID")
      .notNull()
      .references(() => shoppingCart.cartID),
    addressID: integer("shippingAddress")
      .references(() => shippingAddresses.addressID)
      .notNull(),
    totalPrice: integer("totalPrice").notNull(),
    products: text("products"),
    orderDate: text("orderDate")
      .notNull()
      .default(sql`(current_timestamp)`), // timestamp als Text gespeichert
  },
  (orders) => {
    return {
      orderIdIndex2: index("orderIdIndex2").on(orders.cartID),
      userIdIndex4: index("userIdIndex4").on(orders.userID),
      addressIdIndex1: index("addressIdIndex1").on(orders.addressID),
    };
  }
);
