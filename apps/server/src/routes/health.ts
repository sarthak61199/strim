import { Hono } from "hono";

const healthRoutes = new Hono();

healthRoutes.get("/", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "0.0.1",
  });
});

export { healthRoutes };
