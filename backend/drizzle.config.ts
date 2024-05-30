import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/*",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
