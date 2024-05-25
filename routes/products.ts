import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod';


const productSchema = z.object({
        id: z.number().int().positive().min(1),
        name: z.string().min(3).max(255),
        amount: z.number().int().positive()
})

type Products = z.infer<typeof productSchema>

const createPostSchema = productSchema.omit({id: true})

const fakeProducts: Products[] = [
    { id: 1, name: "Mikrowelle", amount: 10 },
    { id: 2, name: "Herd", amount: 5 },
    { id: 3, name: "Messer", amount: 8 }
];


export const productsRoute = new Hono()
.get("/", (c) => {
    return c.json({ products: fakeProducts }); 
})
.post("/", zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.valid("json")
    const product = createPostSchema.parse(data)
    fakeProducts.push({ id: fakeProducts.length + 1, ...product })
    c.status(201)
    return c.json({product}); 
})
.get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const product = fakeProducts.find(product => product.id === id);
    if (!product) {
        return c.notFound();
    }
    return c.json({ product });
})
.delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeProducts.findIndex(product => product.id === id);
    if (index === -1) {
        return c.notFound();
    }
    const deletedProduct = fakeProducts.splice(index, 1) [0];
    return c.json({ product: deletedProduct });
})
// .put