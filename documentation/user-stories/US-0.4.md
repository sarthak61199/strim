# US-0.4: Scaffold Server App with Hono + TypeScript

**User Story:** I have a server app scaffolded with Hono, TypeScript, and basic project structure.

## Implementation Plan

### 🎯 Objective

Set up the backend media server application using Hono framework with TypeScript, establishing the foundational structure for the API endpoints that will handle media streaming, metadata management, and file operations.

### 📋 Prerequisites

- Turborepo monorepo structure set up (US-0.1)
- Root package.json with workspaces configured (US-0.2)
- turbo.json configured for dependency-ordered builds (US-0.3)
- Node.js 20+ installed
- Basic understanding of Hono and REST APIs

### 🚀 Implementation Steps

#### 1. Initialize Server Package

Create the basic package structure for the server app:

```json
// apps/server/package.json
{
  "name": "@strim/server",
  "version": "0.0.0",
  "private": true,
  "main": "dist/index.js",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "@hono/node-server": "^1.8.0",
    "@strim/types": "workspace:*",
    "@strim/utils": "workspace:*",
    "@strim/config": "workspace:*",
    "pino": "^8.17.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsup": "^8.0.0",
    "tsx": "^4.7.0",
    "typescript": "^5.0.0",
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0"
  }
}
```

#### 2. Create TypeScript Configuration

```json
// apps/server/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@strim/*": ["../../packages/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

#### 3. Set Up Basic Server Structure

Create the main application entry point:

```typescript
// apps/server/src/index.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { healthRoutes } from "./routes/health";
import { mediaRoutes } from "./routes/media";

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
```

#### 4. Create Health Check Route

```typescript
// apps/server/src/routes/health.ts
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
```

#### 5. Create Media Routes Structure

```typescript
// apps/server/src/routes/media.ts
import { Hono } from "hono";

const mediaRoutes = new Hono();

// Placeholder routes for future implementation
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
```

#### 7. Set Up Development Scripts

Add development-specific configuration:

```typescript
// apps/server/src/dev.ts (optional development helpers)
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Development utilities
export const setupDevEnvironment = async () => {
  try {
    // Check if required tools are available
    await execAsync("ffmpeg -version");
    console.log("✅ FFmpeg is available");

    await execAsync("ffprobe -version");
    console.log("✅ FFprobe is available");
  } catch (error) {
    console.warn(
      "⚠️  Media processing tools not found. Install FFmpeg for full functionality."
    );
  }
};
```

#### 8. Configure ESLint

```javascript
// apps/server/.eslintrc.js
module.exports = {
  extends: ["../../.eslintrc.js"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Server-specific rules
  },
};
```

### ✅ Acceptance Criteria

- [ ] `apps/server/package.json` exists with Hono and TypeScript dependencies
- [ ] Server structure includes `src/`, `dist/`, and config files
- [ ] Basic Hono app setup with middleware (logger, cors)
- [ ] Health check endpoint (`GET /api/health`) returns proper JSON response
- [ ] Media routes placeholder structure in place
- [ ] TypeScript configuration with proper path aliases
- [ ] Build scripts work (`npm run build`, `npm run dev`)
- [ ] Type checking passes (`npm run check-types`)
- [ ] Server starts successfully on configured port

### 🧪 Testing

```bash
# Install dependencies
npm install

# Test build process
npm run build

# Test type checking
npm run check-types

# Test linting
npm run lint

# Start development server
npm run dev

# Test health endpoint
curl http://localhost:3001/api/health
```

### 🔗 Related User Stories

- **US-0.1:** Turborepo monorepo structure setup
- **US-0.2:** Root package.json with workspaces and scripts
- **US-0.3:** turbo.json configured for dependency-ordered builds
- **US-0.5:** Web app scaffolded with Next.js + Tailwind + TS
- **US-0.6:** Database schema and migrations with Prisma/Drizzle
- **US-0.7:** Media scanning and metadata extraction

### 📝 Notes

- Hono provides excellent TypeScript support and performance for the media server
- The server will handle media streaming, metadata, and file operations
- Basic CORS and logging middleware are essential for development
- Path aliases ensure clean imports across the monorepo
- The server should be lightweight and suitable for Raspberry Pi deployment
