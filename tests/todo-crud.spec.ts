import { test, expect } from "@playwright/test";

test.describe("Todo CRUD Flow", () => {
  let email: string;
  const password = "password123";

  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => {
      console.log("BROWSER LOG:", msg.text());
    });

    email = `test-todo-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}@example.com`;

    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("email").fill(email);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "サインアップ" }).click();

    await expect(page).toHaveURL(/todos/, { timeout: 10000 });
    await expect(page.locator("body")).toContainText("Todo リスト");
  });

  test("Todoページを開ける", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Todo リスト");
  });

  test("Todoを追加できる、表示される、完了状態にできる、削除できる", async ({
    page,
  }) => {
    const todoTitle = `My new todo ${Date.now()}`;

    await page.getByTestId("new-todo-input").fill(todoTitle);
    await page.getByTestId("add-todo-button").click();

    const todoItem = page.locator(`li:has-text("${todoTitle}")`);
    await expect(todoItem).toBeVisible();

    const todoCheckbox = todoItem.getByRole("checkbox");
    const todoLabel = todoItem.locator("label");
    const deleteButton = todoItem.getByTestId(/delete-todo-button-/);

    await expect(todoCheckbox).toBeVisible();
    await expect(todoCheckbox).toBeEnabled();
    await expect(todoCheckbox).toHaveAttribute("aria-checked", "false");
    await expect(todoLabel).not.toHaveClass(/line-through/);

    // Diagnostic: Check if keyboard events reach the component
    await todoCheckbox.focus();
    const keydownPromise1 = page.waitForEvent('console', { predicate: msg => msg.text().includes('Checkbox keydown: Space') });
    const keyupPromise1 = page.waitForEvent('console', { predicate: msg => msg.text().includes('Checkbox keyup: Space') });
    await page.keyboard.press("Space");
    await expect(keydownPromise1).resolves.toBeDefined();
    await expect(keyupPromise1).resolves.toBeDefined();

    await expect(todoCheckbox).toHaveAttribute("aria-checked", "true", {
      timeout: 10000,
    });
    await expect(todoLabel).toHaveClass(/line-through/, { timeout: 10000 });

    // Diagnostic: Check if keyboard events reach the component for the second toggle
    await todoCheckbox.focus();
    const keydownPromise2 = page.waitForEvent('console', { predicate: msg => msg.text().includes('Checkbox keydown: Space') });
    const keyupPromise2 = page.waitForEvent('console', { predicate: msg => msg.text().includes('Checkbox keyup: Space') });
    await page.keyboard.press("Space");
    await expect(keydownPromise2).resolves.toBeDefined();
    await expect(keyupPromise2).resolves.toBeDefined();

    await expect(todoCheckbox).toHaveAttribute("aria-checked", "false", {
      timeout: 10000,
    });
    await expect(todoLabel).not.toHaveClass(/line-through/, {
      timeout: 10000,
    });

    await deleteButton.click();

    await expect(todoItem).not.toBeVisible();
    await expect(page.locator("body")).toContainText("Todoがありません。");
  });
});
