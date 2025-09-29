# US-0.1: Create Turborepo Monorepo Structure

**User Story:** I can create a Turborepo monorepo with `apps/`, `packages/`, and `infra/` folders already in place.

## Implementation Plan

### 🎯 Objective
Set up the foundational Turborepo monorepo structure with the three main directories (`apps/`, `packages/`, `infra/`) and basic configuration files to establish the project's architectural foundation.

### 📋 Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of monorepo concepts

### 🚀 Implementation Steps

#### 1. Initialize Turborepo Project
```bash
# Create a new Turborepo project
npx create-turbo@latest .

# Navigate to the project (if not already there)
cd strim
```

#### 2. Set Up Directory Structure
```bash
# Create the main directories as specified in the user story
mkdir -p apps packages infra

# Create subdirectories for expected apps
mkdir -p apps/server apps/web apps/cli

# Create subdirectories for expected packages
mkdir -p packages/types packages/utils packages/config packages/db packages/api-client
```

#### 3. Configure Root Package.json
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
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "test": "turbo test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "prettier": "^3.0.0",
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "npm@9.0.0"
}
```

#### 4. Configure Turbo.json
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

#### 5. Create Shared TypeScript Configuration
Create `packages/types/package.json`:
```json
{
  "name": "@strim/types",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

Create `packages/types/index.ts`:
```typescript
// Shared TypeScript types will be defined here
export interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  // Additional shared types...
}
```

#### 6. Create Utils Package
Create `packages/utils/package.json`:
```json
{
  "name": "@strim/utils",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

Create `packages/utils/index.ts`:
```typescript
// Shared utility functions will be defined here
export const formatDuration = (seconds: number): string => {
  // Implementation...
};
```

#### 7. Set Up Basic Configuration Package
Create `packages/config/package.json`:
```json
{
  "name": "@strim/config",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### 8. Initialize Git Repository
```bash
# Initialize git if not already done
git init

# Create .gitignore
echo "node_modules/
.next/
dist/
.env*
.DS_Store
*.log" > .gitignore
```

#### 9. Create README.md
```markdown
# Strim

A lightweight, self-hosted media server and player.

## Development

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build all packages and apps
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```
```

#### 10. Verify Structure
Run the following to verify the monorepo structure is correctly set up:
```bash
# Check workspace structure
npm run build

# Verify turbo can detect all workspaces
npx turbo run build --dry-run
```

### ✅ Acceptance Criteria
- [ ] `apps/`, `packages/`, and `infra/` directories exist
- [ ] `turbo.json` is configured with proper task dependencies
- [ ] `package.json` has workspaces array configured
- [ ] Basic shared packages (`types`, `utils`, `config`) are scaffolded
- [ ] `npm run build` runs successfully across the monorepo
- [ ] `npm run dev` can start development mode

### 🧪 Testing
```bash
# Test that workspaces are properly linked
npm install

# Test that turbo can run tasks
npm run build

# Verify package imports work
node -e "console.log('Monorepo structure validated')"
```

### 🔗 Related User Stories
- **US-0.2:** Root package.json with workspaces and scripts
- **US-0.3:** turbo.json configured to build in dependency order
- **US-0.8:** Shared packages for types, utils, config, and db

### 📝 Notes
- This establishes the foundation for all subsequent development
- The monorepo structure allows for shared packages and coordinated builds
- Turborepo provides caching and parallelization benefits for the build process
