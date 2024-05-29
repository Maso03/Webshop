import { Hono, type Context, type Next } from "hono";
import { kindeClient, sessionManager } from "../kinde";

const adminRoute = new Hono();
let accessToken: string | undefined;

// Middleware zur Berechtigungsprüfung
// Middleware zur Berechtigungsprüfung
const checkIsAdmin = async (c: Context, next: Next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const permissions = await kindeClient.getPermissions(manager);
    console.log("User Permissions:", permissions);

    const hasPermission = permissions.permissions.some(
      (perm: string) => perm === "isadmin"
    );
    console.log("Has permission:", hasPermission);

    if (!hasPermission) {
      return c.json({ error: "Forbidden" }, 403);
    }

    await next();
  } catch (error) {
    console.error("Error checking permission:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export { checkIsAdmin };

adminRoute
  .use(checkIsAdmin)
  .get("/users", async (c) => {
    try {
      const accessToken = process.env.access_token;

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      console.log("Headers:", headers);

      const response = await fetch(`https://webshop.kinde.com/api/v1/users`, {
        method: "GET",
        headers: headers,
      });
      console.log("Response:", response);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          "Failed to fetch users:",
          response.status,
          response.statusText,
          errorDetails
        );
        return c.json({
          error: "Failed to fetch users",
          details: errorDetails,
        });
      }

      const body = await response.json();
      console.log("Body:", body);
      return c.json({
        users: body.users,
        next_token: body.next_token,
        total: body.total,
      });
    } catch (error) {
      console.error("Internal server error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .get("/roles", async (c) => {
    try {
      const accessToken = process.env.access_token;

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(`https://webshop.kinde.com/api/v1/roles`, {
        method: "GET",
        headers: headers,
      });
      console.log("Response:", response);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          "Failed to fetch roles:",
          response.status,
          response.statusText,
          errorDetails
        );
        return c.json({
          error: "Failed to fetch roles",
          details: errorDetails,
        });
      }

      const body = await response.json();
      return c.json({ roles: body.roles, next_token: body.next_token });
    } catch (error) {
      console.error("Internal server error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .post("/createuser", async (c) => {
    try {
      const accessToken = process.env.access_token;
      const inputBody = await c.req.json(); // Den Body-Inhalt aus dem Request lesen

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch("https://webshop.kinde.com/api/v1/user", {
        method: "POST",
        body: JSON.stringify(inputBody), // Den dynamischen Body übergeben
        headers: headers,
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          "Failed to create user:",
          response.status,
          response.statusText,
          errorDetails
        );
        return c.json({
          error: "Failed to create user",
          details: errorDetails,
        });
      }

      const body = await response.json();
      return c.json({ user: body });
    } catch (error) {
      console.error("Internal server error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .delete("/deleteuser/:id", async (c) => {
    try {
      const userId = c.req.param("id"); // Benutzer-ID aus der URL extrahieren
      const accessToken = process.env.access_token;

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `https://webshop.kinde.com/api/v1/user?id=${userId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          "Failed to delete user:",
          response.status,
          response.statusText,
          errorDetails
        );
        return c.json({
          error: "Failed to delete user",
          details: errorDetails,
        });
      }

      const body = await response.json();
      return c.json({ message: "User deleted successfully", user: body });
    } catch (error) {
      console.error("Internal server error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  });

export { adminRoute };
