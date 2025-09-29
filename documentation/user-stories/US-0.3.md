# US-0.3: Configure Turbo.json for Dependency-Ordered Builds

**User Story:** I have `turbo.json` configured to build apps/packages in dependency order.

## Implementation Plan

### 🎯 Objective
Configure Turborepo's `turbo.json` file to orchestrate builds, tests, and development tasks across the monorepo in proper dependency order, ensuring that shared packages are built before the applications that depend on them, while optimizing for caching and parallel execution.

### 📋 Prerequisites
- Turborepo monorepo structure set up (US-0.1)
- Root package.json with workspaces configured (US-0.2)
- Basic understanding of Turborepo task dependencies and caching

### 🚀 Implementation Steps

#### 1. Analyze Dependency Graph
Understand the monorepo's dependency relationships:
- **Shared packages** (`packages/*`) should build first as they have no dependencies
- **Applications** (`apps/*`) depend on shared packages and should build after them
- **Infrastructure** (`infra/*`) may depend on packages or apps

#### 2. Configure Turbo.json Tasks
Update `turbo.json` with proper task definitions and dependency ordering:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "**/.env.*local",
    "turbo.json",
    "package.json"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        "dist/**",
        ".next/**",
        "!.next/cache/**",
        "build/**",
        ".output/**"
      ]
    },
    "check-types": {
      "dependsOn": ["^build"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "lint:fix": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "test:watch": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    },
    "format": {
      "cache": false
    },
    "format:check": {}
  }
}
```

#### 3. Key Dependency Configurations

**Build Task Dependencies:**
- `"dependsOn": ["^build"]` ensures packages build before their dependents
- Example: `packages/types` → `packages/utils` → `apps/server`

**Output Definitions:**
- `dist/**` - Standard build output directory
- `.next/**` - Next.js build artifacts
- `!.next/cache/**` - Exclude cache from outputs (not needed for caching)
- `build/**` - Alternative build directory
- `.output/**` - Nuxt.js or other framework outputs

**Cache Control:**
- `cache: false` for tasks that shouldn't be cached (dev, clean, format)
- `persistent: true` for long-running tasks (dev, test:watch)

#### 4. Validate Dependency Order
```bash
# Test that turbo understands the dependency graph
npx turbo run build --dry-run

# Verify build order is correct
npx turbo run build --dry-run --graph | cat
```

#### 5. Test Parallel Execution
```bash
# Run builds to ensure parallelization works
npm run build

# Verify caching works by running build again
npm run build
```

#### 6. Configure Additional Tasks
Add task-specific configurations for different package types:

**For TypeScript packages:**
```json
{
  "check-types": {
    "dependsOn": ["^build"],
    "inputs": ["src/**/*.ts", "src/**/*.tsx", "tsconfig.json"]
  }
}
```

**For Applications:**
```json
{
  "dev": {
    "dependsOn": ["^build"],
    "cache": false,
    "persistent": true,
    "env": ["NODE_ENV", "PORT"]
  }
}
```

### ✅ Acceptance Criteria
- [ ] `turbo.json` exists with proper `$schema` reference
- [ ] `build` task has `"dependsOn": ["^build"]` for dependency ordering
- [ ] Output paths configured for effective caching (`dist/**`, `.next/**`, etc.)
- [ ] `dev` task has `cache: false` and `persistent: true`
- [ ] `lint`, `test`, and `check-types` depend on `^build`
- [ ] `npx turbo run build --dry-run` shows correct dependency order
- [ ] Parallel builds execute correctly (`npm run build` succeeds)
- [ ] Caching works (second build completes faster)

### 🧪 Testing
```bash
# Test dependency resolution
npx turbo run build --dry-run

# Test actual build execution
npm run build

# Verify caching by running again
time npm run build

# Test individual task dependencies
npx turbo run lint --dry-run
npx turbo run test --dry-run

# Check that dev servers start correctly
timeout 5s npm run dev || echo "Dev servers started successfully"
```

### 🔗 Related User Stories
- **US-0.1:** Turborepo monorepo structure setup
- **US-0.2:** Root package.json with workspaces and scripts
- **US-0.4:** Server app scaffolded with Hono/Fastify + TS
- **US-0.5:** Web app scaffolded with Next.js + Tailwind + TS
- **US-0.8:** Shared packages for types, utils, config, and db

### 📝 Notes
- The `^` prefix in `dependsOn` tells Turborepo to run the task on dependencies first
- Proper output configuration enables effective caching between builds
- `globalDependencies` ensures tasks rerun when shared config files change
- Dependency ordering prevents race conditions in parallel builds
- This configuration scales as more packages and apps are added to the monorepo
