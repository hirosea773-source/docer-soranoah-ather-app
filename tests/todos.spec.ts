import { test, expect } from "@playwright/test";

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    const email = `todo-user-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
    const password = "password123";

    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("email").fill(email);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "サインアップ" }).click();
    await page.waitForURL("http://localhost:3000/todos");
  });

  test("Todoを追加できること", async ({ page }) => {
    await page.goto("http://localhost:3000/todos");
    await page.locator('[data-testid="new-todo-input"]').fill("新しいTodo");
    await page.locator('[data-testid="add-todo-button"]').click();
    await expect(page.locator('[data-testid^="todo-item-"]')).toContainText(
      "新しいTodo",
    );
  });

  test("Todoを完了/未完了にできること", async ({ page }) => {
    await page.goto("http://localhost:3000/todos");
    await page.locator('[data-testid="new-todo-input"]').fill("完了テストTodo");
    await page.locator('[data-testid="add-todo-button"]').click();

    const todoItem = page.locator('[data-testid^="todo-item-"]', {
      hasText: "完了テストTodo",
    });
    await expect(
      todoItem.locator('[data-testid^="todo-checkbox-"]'),
    ).not.toBeChecked();

    await todoItem.locator('[data-testid^="todo-checkbox-"]').click();
    await expect(
      todoItem.locator('[data-testid^="todo-checkbox-"]'),
    ).toBeChecked();

    await todoItem.locator('[data-testid^="todo-checkbox-"]').click();
    await expect(
      todoItem.locator('[data-testid^="todo-checkbox-"]'),
    ).not.toBeChecked();
  });

  test("Todoを削除できること", async ({ page }) => {
    await page.goto("http://localhost:3000/todos");
    await page.locator('[data-testid="new-todo-input"]').fill("削除テストTodo");
    await page.locator('[data-testid="add-todo-button"]').click();

    const todoItem = page.locator('[data-testid^="todo-item-"]', {
      hasText: "削除テストTodo",
    });
    await expect(todoItem).toBeVisible();
    await todoItem.locator('[data-testid^="delete-todo-button-"]').click();
    await expect(todoItem).not.toBeVisible();
  });
});
