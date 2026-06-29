import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_SUPABASE_URL:
        process.env.PLAYWRIGHT_SUPABASE_URL ||
        "http://host.docker.internal:54321",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgresql://postgres:postgres@host.docker.internal:54322/postgres",
    },
  },
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
