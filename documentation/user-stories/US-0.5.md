# US-0.5: Scaffold Web App with React + Vite + Tailwind + TypeScript

**User Story:** I have a `web` app scaffolded with React + Vite + Tailwind + TypeScript.

## Implementation Plan

### 🎯 Objective

Create a modern React web application using Vite as the build tool, styled with Tailwind CSS, and fully typed with TypeScript. This will serve as the frontend for the media server, providing a responsive and performant user interface.

### 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of React and TypeScript
- US-0.1 (Turborepo monorepo structure) completed
- US-0.4 (Server app scaffolded) completed

### 🚀 Implementation Steps

#### 1. Initialize Vite React Project in apps/web/

```bash
# Navigate to the web app directory
cd apps/web

# Create a new Vite React TypeScript project
npm create vite@latest . -- --template react-ts --yes
```

#### 2. Install Additional Dependencies

```bash
# Install Tailwind CSS v4 and related packages
npm install -D tailwindcss @tailwindcss/vite

# Install shared packages from monorepo
npm install @strim/types @strim/utils @strim/config
```

#### 3. Configure Vite for Tailwind CSS v4

Update `apps/web/vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

#### 4. Update CSS with Tailwind v4 Import

Replace contents of `apps/web/src/index.css`:

```css
@import "tailwindcss";
```

#### 5. Update Root Turbo Configuration

Ensure `turbo.json` includes web app tasks:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### ✅ Acceptance Criteria

- [ ] `apps/web/` directory contains a complete React + Vite + TypeScript setup
- [ ] Path mapping works for monorepo packages (`@strim/*`)

### 🔗 Related User Stories

- **US-0.1:** Turborepo monorepo structure
- **US-0.2:** Root package.json with workspaces and scripts
- **US-0.3:** turbo.json configured for dependency order
- **US-0.4:** Server app scaffolded
- **US-0.7:** Running `npm run dev` starts server and web together
- **US-0.8:** Shared packages for types, utils, config, and db

### 📝 Notes

- Vite provides fast development experience with instant hot reload
- Tailwind CSS v4 offers improved performance and simplified configuration compared to v3
- The new CSS-first configuration approach eliminates the need for separate config files
- TypeScript ensures type safety across the frontend codebase
- The web app integrates with shared monorepo packages for consistency
- This establishes the foundation for the media browsing and playback UI
