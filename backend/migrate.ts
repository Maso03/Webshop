// migrations.ts
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./db/index.ts";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migration completed");
}

runMigrations().catch(console.error);
