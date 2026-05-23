import { test, expect } from "@playwright/test";

test("redirect unauthenticated user", async ({ page }) => {
  await page.goto("http://localhost:3000/todos");

  await expect(page).toHaveURL(/login/);
});
