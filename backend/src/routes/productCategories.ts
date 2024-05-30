import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../../db";
import { productCategories as productCategoryTable } from "../../db/schema/productCategories";
import { desc, eq } from "drizzle-orm";
import { products as productTable } from "../../db/schema/products";

const productCategorySchema = z.object({
  categoryID: z.number().int().positive().min(1),
  categoryName: z.string().min(2).max(255),
  description: z.string().optional(),
});

type ProductCategories = z.infer<typeof productCategorySchema>;

const createPostSchema = productCategorySchema.omit({ categoryID: true });

export const productCategoriesRoute = new Hono()
  .get("/", async (c) => {
    // Führen Sie eine JOIN-Abfrage zwischen den Tabellen "productCategories" und "products" durch
    // und wählen Sie die benötigten Spalten aus
    const productCategories = await db
      .select({
        categoryID: productCategoryTable.categoryID,
        categoryName: productCategoryTable.categoryName,
        description: productTable.description,
        productID: productTable.productID,
        productName: productTable.productName,
        price: productTable.price,
        availability: productTable.availability,
      })
      .from(productCategoryTable)
      .innerJoin(
        productTable,
        eq(productCategoryTable.categoryID, productTable.categoryID)
      );
    console.log(productCategories);

    // Formatieren Sie die Daten, um ein Array von Produktkategorien zu erhalten
    const formattedProductCategories = [];
    for (const product of productCategories) {
      const categoryIndex = formattedProductCategories.findIndex(
        (c) => c.categoryID === product.categoryID
      );
      if (categoryIndex === -1) {
        formattedProductCategories.push({
          categoryID: product.categoryID,
          categoryName: product.categoryName,
          products: [
            {
              productID: product.productID,
              productName: product.productName,
              price: product.price,
              availability: product.availability,
              description: product.description,
            },
          ],
        });
      } else {
        formattedProductCategories[categoryIndex].products.push({
          productID: product.productID,
          productName: product.productName,
          price: product.price,
          availability: product.availability,
          description: product.description,
        });
      }
    }

    return c.json({
      productCategories: formattedProductCategories,
    });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const productCategory = await c.req.valid("json");

    const result = await db
      .insert(productCategoryTable)
      .values({
        ...productCategory,
      })
      .returning();

    c.status(201);
    return c.json({ result });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    // Führen Sie eine JOIN-Abfrage zwischen den Tabellen "productCategories" und "products" durch
    // und wählen Sie die benötigten Spalten aus, wobei Sie die Abfrage auf die gewünschte Kategorie-ID beschränken
    const productCategory = await db
      .select({
        categoryID: productCategoryTable.categoryID,
        categoryName: productCategoryTable.categoryName,
        description: productCategoryTable.description,
        description2: productTable.description,
        productID: productTable.productID,
        productName: productTable.productName,
        price: productTable.price,
        availability: productTable.availability,
      })
      .from(productCategoryTable)
      .innerJoin(
        productTable,
        eq(productCategoryTable.categoryID, productTable.categoryID)
      )
      .where(eq(productCategoryTable.categoryID, id));

    console.log(productCategory);
    if (!productCategory) {
      return c.notFound();
    }

    // Formatieren Sie die Daten, um ein Objekt mit der Produktkategorie und ihren Produkten zu erhalten
    const formattedProductCategory: {
      categoryID: number;
      categoryName: string;
      description: string | null;
      products: {
        productID: number;
        productName: string;
        price: string;
        availability: number | null;
        description2: string | null;
      }[];
    } = {
      categoryID: productCategory[0].categoryID,
      categoryName: productCategory[0].categoryName,
      description: productCategory[0].description,
      products: [],
    };
    for (const product of productCategory) {
      formattedProductCategory.products.push({
        productID: product.productID,
        productName: product.productName,
        price: product.price,
        availability: product.availability,
        description2: product.description2,
      });
    }

    return c.json({
      productCategory: formattedProductCategory,
    });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = await db
      .select()
      .from(productCategoryTable)
      .where(eq(productCategoryTable.categoryID, id));
    if (!index) {
      return c.notFound();
    }
    const deletedProductCategory = await db
      .delete(productCategoryTable) // Add the table name as an argument
      .where(eq(productCategoryTable.categoryID, id))
      .returning();

    return c.json({ productCategory: deletedProductCategory });
  })
  .put("/:id{[0-9]+}", zValidator("json", productCategorySchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const productCategory = await c.req.valid("json");

    const updatedProductCategory = await db
      .update(productCategoryTable)
      .set(productCategory)
      .where(eq(productCategoryTable.categoryID, id))
      .returning();

    return c.json({ productCategory: updatedProductCategory });
  });
