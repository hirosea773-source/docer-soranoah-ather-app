# CLAUDE.md

## Project

Local-first fullstack development template.

## Environment

- WSL2 Ubuntu 24.04
- DevContainer
- Docker Desktop
- Local Supabase

## Auth

- Supabase SSR auth
- middleware.ts protects /todos
- redirect unauthenticated users to /login

## Testing

- Playwright E2E enabled
- chromium only currently

## Important

- middleware.ts must stay at project root
- Use App Router only
- Use createBrowserClient from @supabase/ssr
- Use createServerClient in middleware
