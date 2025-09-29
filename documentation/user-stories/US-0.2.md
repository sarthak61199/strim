# US-0.2: Configure Root Package.json with Workspaces and Scripts

**User Story:** I have a root `package.json` with workspaces and scripts (`dev`, `build`, `lint`, `test`).

## Implementation Plan

### 🎯 Objective
Configure the root `package.json` to properly manage the monorepo workspaces and provide essential npm scripts for development workflow, ensuring all packages and apps can be built, tested, and developed efficiently.

### 📋 Prerequisites
- Turborepo monorepo structure set up (US-0.1)
- Node.js 18+ installed
- Basic understanding of npm workspaces and package.json

### 🚀 Implementation Steps

#### 1. Verify Workspace Structure
Ensure the monorepo structure from US-0.1 is in place:
```bash
# Verify directories exist
ls -la apps/ packages/ infra/
```

#### 2. Configure Root Package.json
Update or create the root `package.json` with proper workspace configuration and scripts:

```json
{
  "name": "strim",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*",
    "infra/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "check-types": "turbo run check-types"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "prettier": "^3.0.0",
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18"
  },
  "packageManager": "npm@10.0.0"
}
```

#### 3. Key Configuration Elements

**Workspaces Array:**
- `"apps/*"` - Includes all applications (server, web, cli)
- `"packages/*"` - Includes shared packages (types, utils, config, db, api-client)
- `"infra/*"` - Includes infrastructure-related packages

**Essential Scripts:**
- `build` - Builds all packages and apps in dependency order
- `dev` - Starts development servers with hot reload
- `lint` - Runs linting across all workspaces
- `test` - Executes test suites across all workspaces
- `format` - Formats code using Prettier
- `check-types` - Type checking across TypeScript workspaces

#### 4. Install Dependencies
```bash
# Install all dependencies for the monorepo
npm install
```

#### 5. Verify Workspace Detection
```bash
# Check that npm recognizes all workspaces
npm ls --depth=0

# Verify turbo can see all workspaces
npx turbo run build --dry-run
```

### ✅ Acceptance Criteria
- [ ] Root `package.json` exists with `"private": true`
- [ ] `workspaces` array includes `"apps/*"`, `"packages/*"`, `"infra/*"`
- [ ] `scripts` object contains `dev`, `build`, `lint`, and `test` commands
- [ ] All scripts use `turbo run` prefix for orchestration
- [ ] Essential devDependencies installed (`turbo`, `typescript`, `prettier`, `@types/node`)
- [ ] `npm install` completes successfully
- [ ] `npm run build` executes without errors
- [ ] `npm run dev` starts development environment

### 🧪 Testing
```bash
# Test workspace functionality
npm install

# Test build script
npm run build

# Test lint script
npm run lint

# Test dev script (should start development servers)
timeout 10s npm run dev || true

# Verify workspace listing
npm ls --depth=0 | grep -E "(apps|packages|infra)"
```

### 🔗 Related User Stories
- **US-0.1:** Turborepo monorepo structure setup
- **US-0.3:** turbo.json configured to build in dependency order
- **US-0.8:** Shared packages for types, utils, config, and db
- **US-0.9:** ESLint, Prettier, Husky hooks for clean commits

### 📝 Notes
- The root package.json serves as the monorepo orchestrator
- Workspaces allow cross-package dependencies and shared development
- Turbo scripts provide caching and parallel execution benefits
- The `private: true` flag prevents accidental publishing of the monorepo root
- Engines specification ensures Node.js version compatibility
