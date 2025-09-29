# 🛠 Tech Stack

This document describes the technology stack used for the media server + player.

---

## Core Goals

- **Lightweight & fast**: Minimal resource usage, suitable for Raspberry Pi / NAS.
- **Fully self-hosted**: All data lives on the user’s machine.
- **Extensible**: Easy to add new libraries, auth providers, metadata sources.
- **Type-safe end-to-end**: Everything written in TypeScript.

---

## Monorepo & Tooling

- **Monorepo:** Turborepo
- **Package Manager:** npm workspaces
- **Languages:** TypeScript (strict mode)
- **Linting/Formatting:** ESLint, Prettier, Husky pre-commit hooks
- **Testing:** Vitest / Jest (unit + integration)
- **CI/CD:** GitHub Actions (lint, test, build)
- **Env Validation:** Zod

---

## Backend (Media Server)

- **Runtime:** Node.js 20+
- **Framework:** Hono (or Fastify if preferred)
- **Database:** SQLite (via Prisma or Drizzle ORM)
- **File Watching:** chokidar
- **Metadata Extraction:** ffprobe (from FFmpeg)
- **Transcoding:** ffmpeg (H.264 + AAC → HLS/fMP4)
- **Job Queue:** Lightweight in-memory queue (BullMQ or custom)
- **Logging:** pino (structured JSON logs)
- **API:** REST (JSON responses), Range requests, HLS playlist endpoints
- **Auth:** Header-based trust, optional OIDC (via openid-client)

---

## Frontend (Web Player)

- **Framework:** React 19.1.0 + Vite
- **UI:** Tailwind CSS + shadcn/ui
- **Player:** HTML5 `<video>` + hls.js (adaptive streaming)
- **State Management:** React Query / TanStack Query
- **Build/Deploy:** Vercel or Docker container

---

## CLI (Optional)

- **CLI Framework:** Commander or Yargs
- **Commands:** `scan`, `cache prune`, `status`, `migrate`

---

## Infra / Deployment

- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Caddy / Traefik / Nginx (user-provided)
- **TLS/HTTPS:** via proxy (Let's Encrypt)
- **Auth Gateway:** Authelia / Authentik / OAuth2-Proxy (user-provided)
- **Images:** Published to GHCR or Docker Hub

---

## Development DX

- **Hot Reload:** ts-node-dev for server, Next.js dev mode for web
- **Path Aliases:** `@mymedia/types`, `@mymedia/utils`, `@mymedia/db`
- **Mock Data:** Fake media library for UI development
- **API Client:** Shared TS client in `packages/api-client`

---

## External Services

- **TMDb API:** for metadata (title, poster, backdrops, cast info)
- **Local FFmpeg:** required for scanning, thumbnail generation, and transcoding
