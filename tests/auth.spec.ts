import { test, expect } from "@playwright/test";

test("redirect unauthenticated user", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/todos");

  await expect(page).toHaveURL(/login/);
});
