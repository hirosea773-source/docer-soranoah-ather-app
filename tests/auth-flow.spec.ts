import { test, expect } from "@playwright/test";

test("signup login flow", async ({ page }) => {
  page.on("console", (message) => {
    console.log("BROWSER LOG:", message.text());
  });

  page.on("response", (response) => {
    if (response.url().includes("/auth/v1/signup")) {
      console.log("SIGNUP RESPONSE:", response.status(), response.url());
    }
  });

  const email = `test-${Date.now()}@example.com`;
  const password = "password123";

  await page.goto("http://localhost:3000/login");

  await page.getByPlaceholder("email").fill(email);
  await page.getByPlaceholder("password").fill(password);

  await page.getByRole("button", { name: "サインアップ" }).click();
  await page.waitForURL(/todos/); // todosページへのリダイレクトを待機

  console.log("CURRENT URL:", page.url());

  await expect(page).toHaveURL(/todos/);

  await expect(page.locator("body")).toContainText("Todo リスト");
});
