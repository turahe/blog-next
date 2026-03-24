import { expect, test } from "@playwright/test";

test.describe("tags archive", () => {
  test("shows heading and empty state when API returns no tags", async ({
    page,
  }) => {
    await page.goto("/tags");

    await expect(page).toHaveTitle(/Tags/i);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tag Archive" }),
    ).toBeVisible();
    await expect(page.getByText("No tags found.")).toBeVisible();
  });
});
