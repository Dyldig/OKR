# Jeffries OKR Planner

A full-stack OKR planning web application for Jeffries Group — Australian organics recycling and landscaping.

## Tech stack

- React 19 + TypeScript (Vite 8)
- Tailwind CSS v4
- Zustand v5 (state + localStorage persistence)
- React Router v7
- Anthropic SDK (claude-sonnet-4-5, streaming)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.example .env
# Edit .env and replace `your_api_key_here` with your key

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## ANTHROPIC_API_KEY

The coaching agent requires a valid Anthropic API key.

1. Get a key from [console.anthropic.com](https://console.anthropic.com)
2. Add it to `.env` as `VITE_ANTHROPIC_API_KEY=sk-ant-...`
3. Restart the dev server

The key is only used client-side via the Anthropic SDK's `dangerouslyAllowBrowser` mode. For production, proxy requests through a backend.

## Features

- **11-step OKR wizard** — person selection, context review, theme & focus area selection, weightings, objective types, objective and KR generation, review, formatted output, feedback
- **AI coaching agent** — powered by claude-sonnet-4-5 with full context injection and streaming
- **15 team members** — all with OKR history, coaching patterns, and strategic priorities
- **Jeffries-specific templates** — Powerscaper, Pellets (C-100, CulChar, BioChar), JCS, Ag division, ROSS/OEE, Employment Hero, AP Link, Buckland Park, Post East Waste
- **localStorage persistence** — sessions saved automatically, last 5 shown on dashboard
- **PDF export** — browser print with print-optimised CSS
- **Copy as text** — clean plain-text output for Mooncamp or email

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/session/new` | New OKR session (11-step wizard) |
| `/session/:id` | View a saved session |
| `/coach` | Standalone coaching chat |
| `/team` | Team directory |

## Build

```bash
npm run build
npm run preview
```
