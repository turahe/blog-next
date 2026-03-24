import { expect, test } from "@playwright/test";

test.describe("coming soon", () => {
  test("shows placeholder copy and back link", async ({ page }) => {
    await page.goto("/coming-soon");

    await expect(
      page.getByRole("heading", { level: 1, name: "This page" }),
    ).toBeVisible();
    await expect(
      page.getByText(/This section is not wired up yet/i),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Back home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
