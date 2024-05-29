import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { productsRoute } from "./routes/products";
import { authRoute } from "./routes/auth";
import { adminRoute } from "./routes/admin";
const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => c.text("Hono!"));
app.get("/moin", (c) => c.text("Hso!"));

const apiRoutes = app
  .basePath("/api")
  .route("/products", productsRoute)
  .route("/", authRoute)
  .route("/admin", adminRoute);

app.use("*", serveStatic({ root: ".frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
