import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("loads with hero heading and site title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Go Blog/i);
    await expect(
      page.getByRole("heading", { level: 1, name: "Nur Wachid" }),
    ).toBeVisible();
  });
});
