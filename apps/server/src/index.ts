import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { healthRoutes } from "./routes/health.js";
import { mediaRoutes } from "./routes/media.js";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

// Routes
app.route("/api/health", healthRoutes);
app.route("/api/media", mediaRoutes);

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

const port = process.env.PORT || 3001;

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
