import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { products as productTable } from "../../db/schema/products";
import { desc, eq } from "drizzle-orm";
import { getUser } from "../kinde";

const productSchema = z.object({
  id: z.number().int().positive().min(1),
  productName: z.string().min(2).max(255),
  description: z.string().max(255).optional(),
  price: z.string(),
  categoryID: z.number().int().positive().min(1),
  availability: z.number().int(),
  image: z.string().optional(), // Hinzufügen der image-Eigenschaft
});

type Products = z.infer<typeof productSchema>;

const createPostSchema = productSchema.omit({ id: true });

export const productsRoute = new Hono()
  .get("/", async (c) => {
    const products = await db.select().from(productTable);

    return c.json({ products: products });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const product = await c.req.valid("json");

    let imageBuffer;
    if (product.image) {
      // Extrahieren Sie das Bild aus der JSON-Payload
      const image = product.image;
      delete product.image; // Entfernen Sie die image-Eigenschaft aus dem product-Objekt

      // Konvertieren Sie das Base64-codierte Bild in einen Buffer
      imageBuffer = Buffer.from(image, "base64");
    }

    const result = await db
      .insert(productTable)
      .values({
        ...product,
        ...(imageBuffer && { image: imageBuffer }), // Speichern Sie den Bild-Buffer in der image-Spalte, wenn vorhanden
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.productID, id));

    if (!product) {
      return c.status(404);
    }

    // Überprüfen, ob das Bild als base64-String gespeichert ist
    let imageBase64String = product[0].image as string; // Hier wird der Typ zu string geändert
    if (typeof imageBase64String !== "string") {
      // Wenn das Bild als Byte-Array gespeichert ist, muss es in einen base64-String umgewandelt werden
      const buffer = Buffer.from(imageBase64String);
      imageBase64String = buffer.toString("base64");
    }

    // Überprüfen, ob der base64-String eine PNG-Datei repräsentiert
    const decodedImage = Buffer.from(imageBase64String, "base64");
    const isPNG =
      decodedImage[0] === 0x89 &&
      decodedImage[1] === 0x50 &&
      decodedImage[2] === 0x4e &&
      decodedImage[3] === 0x47;
    if (!isPNG) {
      // Wenn der base64-String keine PNG-Datei repräsentiert, wird ein Fehler zurückgegeben
      return c.status(400);
    }

    // Wenn alles in Ordnung ist, wird das Produkt mit dem base64-codierten PNG-Bild an den Client zurückgesendet
    return c.json({
      product: {
        ...product[0],
        image: `data:image/png;base64,${imageBase64String}`,
      },
    });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(productTable)
      .where(eq(productTable.productID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedProduct = await db
      .delete(productTable) // Add the table name as an argument
      .where(eq(productTable.productID, id))
      .returning();

    return c.json({ product: deletedProduct });
  })
  .put("/:id{[0-9]+}", zValidator("json", productSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const product = await c.req.valid("json");

    let imageBuffer;
    if (product.image) {
      // Extrahieren Sie das Bild aus der JSON-Payload
      const image = product.image;
      delete product.image; // Entfernen Sie die image-Eigenschaft aus dem product-Objekt

      // Konvertieren Sie das Base64-codierte Bild in einen Buffer
      imageBuffer = Buffer.from(image, "base64");
    }

    const updatedProduct = await db
      .update(productTable)
      .set({
        ...product,
        ...(imageBuffer && { image: imageBuffer }), // Aktualisieren Sie den Bild-Buffer in der image-Spalte, wenn vorhanden
      })
      .where(eq(productTable.productID, id))
      .returning();

    return c.json({ product: updatedProduct });
  });
