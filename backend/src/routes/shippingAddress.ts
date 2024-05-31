import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { productCategories as productCategoryTable } from "../../db/schema/productCategories";
import { desc, eq } from "drizzle-orm";
import { products as productTable } from "../../db/schema/products";
import { shippingAddresses as shippingAddressTable } from "../../db/schema/shippingAddresses";

const shippingAddressSchema = z.object({
  addressID: z.number().int().positive().min(1),
  userID: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  postalCode: z.string().min(2),
  country: z.string().min(2),
});

type ShippingAddress = z.infer<typeof shippingAddressSchema>;
const createPostSchema = shippingAddressSchema.omit({ addressID: true });

export const shippingAddressRoute = new Hono()
  .get("/", async (c) => {
    const shippingAddresses = await db.select().from(shippingAddressTable);

    return c.json({ shippingAddresses: shippingAddresses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const shippingAddress = await c.req.valid("json");

    const result = await db
      .insert(shippingAddressTable)
      .values({
        ...shippingAddress,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  // evtl anhand von userid bekommen und nicht anhand von id
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const shippingAddress = await db
      .select()
      .from(shippingAddressTable)
      .where(eq(shippingAddressTable.addressID, id));

    if (!shippingAddress) {
      return c.notFound();
    }
    return c.json({ shippingAddress });
  })
  // hier auch evtl anhand von userid löschen
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(shippingAddressTable)
      .where(eq(shippingAddressTable.addressID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedShippingAddress = await db
      .delete(shippingAddressTable) // Add the table name as an argument
      .where(eq(shippingAddressTable.addressID, id))
      .returning();

    return c.json({ shippingAddress: deletedShippingAddress });
  })
  //hier auch evtl anhand von userid updaten
  .put("/:id{[0-9]+}", zValidator("json", shippingAddressSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const shippingAddress = await c.req.valid("json");

    const updatedShippingAddress = await db
      .update(shippingAddressTable)
      .set(shippingAddress)
      .where(eq(shippingAddressTable.addressID, id))
      .returning();

    return c.json({ shippingAddress: updatedShippingAddress });
  });
