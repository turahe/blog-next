import { expect, test } from "@playwright/test";

test.describe("auth login", () => {
  test("shows heading and login form fields", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page).toHaveTitle(/Login/i);
    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome back" }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
  });
});
