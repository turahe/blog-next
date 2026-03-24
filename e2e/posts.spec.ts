import { expect, test } from "@playwright/test";

test.describe("posts index", () => {
  test("shows journal header and back link", async ({ page }) => {
    await page.goto("/posts");

    await expect(page.getByText("Journal", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "All posts" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Back home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
