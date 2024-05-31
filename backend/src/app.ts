import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { productsRoute } from "./routes/products";
import { authRoute } from "./routes/auth";
import { adminRoute } from "./routes/admin";
import { productCategoriesRoute } from "./routes/productCategories";
import { shoppingCartRoute } from "./routes/shoppingCart";
import { createShoppingCartRoute } from "./routes/createShoppingCart";
import { ordersRoute } from "./routes/order";
import { shippingAddressRoute } from "./routes/shippingAddress";
import { orderHistoryRoute } from "./routes/orderHistory";
import { orderPositionsRoute } from "./routes/orderPositions";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => c.text("Hono!"));
app.get("/moin", (c) => c.text("Hso!"));

const apiRoutes = app
  .basePath("/api")
  .route("/products", productsRoute)
  .route("/", authRoute)
  .route("/admin", adminRoute)
  .route("/productCatogory", productCategoriesRoute)
  .route("/shoppingCart", shoppingCartRoute)
  .route("/createShoppingCart", createShoppingCartRoute)
  .route("/orders", ordersRoute)
  .route("/createShippingAddress", shippingAddressRoute)
  .route("/orderHistory", orderHistoryRoute)
  .route("/orderPositions", orderPositionsRoute);

app.use("*", serveStatic({ root: ".frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
