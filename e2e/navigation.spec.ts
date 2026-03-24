import { expect, test } from "@playwright/test";

test.describe("header navigation (desktop)", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("Blog link goes to posts", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: "Blog", exact: true })
      .click();
    await expect(page).toHaveURL(/\/posts$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "All posts" }),
    ).toBeVisible();
  });

  test("Tags link goes to tags archive", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Tags" }).click();
    await expect(page).toHaveURL(/\/tags$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tag Archive" }),
    ).toBeVisible();
  });

  test("Projects link goes to projects", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeVisible();
  });
});
