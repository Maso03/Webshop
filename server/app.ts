import { Hono } from "hono";
import { logger } from "hono/logger";
import { productsRoute } from "./routes/products";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => c.text("Hono!"));
app.get("/moin", (c) => c.text("Hso!"));

app.route("/products", productsRoute);

export default app;
