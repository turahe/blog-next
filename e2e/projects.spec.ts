import { expect, test } from "@playwright/test";

test.describe("projects", () => {
  test("shows title and outbound GitHub link", async ({ page }) => {
    await page.goto("/projects");

    await expect(page).toHaveTitle(/Projects/i);
    await expect(
      page.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeVisible();
    const github = page.getByRole("main").getByRole("link", { name: "GitHub" });
    await expect(github).toHaveAttribute("href", "https://github.com/turahe");
    await expect(github).toHaveAttribute("target", "_blank");
  });
});
