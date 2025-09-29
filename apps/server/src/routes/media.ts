import { Hono } from "hono";

const mediaRoutes = new Hono();

mediaRoutes.get("/", (c) => {
  return c.json({
    message: "Media API endpoints will be implemented here",
    endpoints: [
      "GET /api/media",
      "GET /api/media/:id",
      "GET /api/media/:id/stream",
      "POST /api/media/scan",
    ],
  });
});

export { mediaRoutes };
