# 📚 User Stories

This document outlines all user stories for the lightweight, self-hosted media server + player project.

---

## 🟢 EPIC 0: Project Setup (Developer Workflow)

**Goal:** As the developer, I want a fully bootstrapped monorepo with clean architecture, so I can build features quickly without worrying about setup.

[x] - **US-0.1:** I can create a Turborepo monorepo with `apps/`, `packages/`, and `infra/` folders already in place.
[x] - **US-0.2:** I have a root `package.json` with workspaces and scripts (`dev`, `build`, `lint`, `test`).
[] - **US-0.3:** I have `turbo.json` configured to build apps/packages in dependency order.
[] - **US-0.4:** I have a `server` app scaffolded with Hono/Fastify + TS and hot reload.
[] - **US-0.5:** I have a `web` app scaffolded with Next.js + Tailwind + TS.
[] - **US-0.6:** I have an optional `cli` app for admin tasks.
[] - **US-0.7:** Running `npm run dev` starts server and web together, with live reload.
[] - **US-0.8:** I have shared packages for `types`, `utils`, `config`, and `db`.
[] - **US-0.9:** I have ESLint, Prettier, Husky hooks for clean commits.
[] - **US-0.10:** I have `.env.example` and a Zod-based env validator.
[] - **US-0.11:** I have SQLite + migrations set up via Drizzle.
[] - **US-0.12:** I have Docker Compose for optional ffmpeg container and local testing.

---

## 🟢 EPIC 1: Installation & Setup

[] - **US-1.1:** I can run the server via a single Docker command.
[] - **US-1.2:** I can run a single binary build on a lightweight machine.
[] - **US-1.3:** I see a first-run wizard in the web UI for libraries, TMDb key, and auth mode.
[]- **US-1.4:** I can reconfigure libraries, TMDb key, and auth later from settings.

---

## 🟠 EPIC 2: Library & Metadata

[] - **US-2.1:** I can add one or more folders as libraries.
[] - **US-2.2:** I can trigger a scan manually from UI or CLI.
[] - **US-2.3:** I can view scan progress and logs.
[] - **US-2.4:** I can remove a library and purge its items from DB.
[] - **US-2.5:** The server extracts technical metadata (duration, codecs, resolution).
[] - **US-2.6:** The server fetches posters, backdrops, cast info from TMDb.
[] - **US-2.7:** I can manually fix metadata if TMDb didn’t match correctly.

---

## 🔵 EPIC 3: Media Browsing

[] - **US-3.1:** I can browse my library in a grid of posters (Movies, Shows).
[] - **US-3.2:** I can search by title and filter by genre/year.
[] - **US-3.3:** I can open a media detail page with description, runtime, cast, etc.

---

## 🔴 EPIC 4: Playback & Streaming

[] - **US-4.1:** I can play media in the web player.
[] - **US-4.2:** I can seek and resume from last watched position.
[] - **US-4.3:** I can view subtitles (SRT/VTT).
[] - **US-4.4:** I can switch audio/subtitle tracks.
[] - **US-4.5:** I get automatic transcoding if direct play is not supported.
[] - **US-4.6:** I get adaptive bitrate streaming (HLS/DASH).
[] - **US-4.7:** I get instant playback while transcoding continues in the background.

---

## 🟡 EPIC 5: Transcoding & Cache

[] - **US-5.1:** I can configure transcode profiles (bitrate, resolution).
[] - **US-5.2:** I can view which media has cached transcodes and their sizes.
[] - **US-5.3:** I can prune cache manually or automatically (LRU + max disk size).
[] - **US-5.4:** I can cancel an in-progress transcode job.

---

## 🟣 EPIC 6: Authentication & Access Control

[] - **US-6.1:** I can run in No-Auth mode (LAN only).
[] - **US-6.2:** I can run in Header Auth mode with configurable username header.
[] - **US-6.3:** I can run in OIDC mode with my own provider (Keycloak, Auth0, etc.).
[] - **US-6.4:** I can view which user is logged in via `/me` endpoint.
[] - **US-6.5:** (Future) I can manage multiple profiles and assign watch history per user.

---

## 🟤 EPIC 7: Admin & Maintenance

[] - **US-7.1:** I can view system health (CPU, memory, uptime).
[] - **US-7.2:** I can restart scanner or clear job queues.
[] - **US-7.3:** I can export/import settings.
[] - **US-7.4:** I can update server easily (Docker pull or binary replacement).

---

## 🟠 EPIC 8: CLI & Power User Features

[] - **US-8.1:** I can run `mymedia scan` to trigger scans from CLI.
[] - **US-8.2:** I can run `mymedia cache prune` to clear transcodes.
[] - **US-8.3:** I can run `mymedia status` to see DB stats, cache usage, active streams.

---

## 🟢 EPIC 9: Future Enhancements

[] - **US-9.1:** I can cast to Chromecast or DLNA devices.
[] - **US-9.2:** I can download media with transcoding.
[] - **US-9.3:** I can create multiple libraries for different audiences (e.g. Kids).
[] - **US-9.4:** I can see scene preview thumbnails on seek bar.
