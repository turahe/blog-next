import { expect, test } from "@playwright/test";

test.describe("blog route", () => {
  test("redirects /blog to /posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveURL(/\/posts$/);
  });
});
