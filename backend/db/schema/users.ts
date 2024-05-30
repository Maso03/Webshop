import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    userID: text("userID").primaryKey(),
    userName: text("userName").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: text("createdAt")
      .notNull()
      .default(sql`(current_timestamp)`), // timestamp als Text gespeichert
  },
  (users) => ({
    emailIndex: uniqueIndex("emailIndex").on(users.email),
  })
);
