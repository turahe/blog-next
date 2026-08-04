import { expect, test } from "@playwright/test";

test.describe("header navigation (desktop)", () => {
  /* Desktop nav shows from lg (1024+) — avoids tablet horizontal overflow */
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

  test("About link goes to about page", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Projects link goes to projects", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeVisible();
  });

  test("Résumé is an external link", async ({ page }) => {
    await page.goto("/");
    const resume = page
      .locator("header")
      .getByRole("link", { name: "Résumé", exact: true });
    await expect(resume).toHaveAttribute("target", "_blank");
    await expect(resume).toHaveAttribute("href", /CV_Nur_Wachid\.pdf/);
  });
});
