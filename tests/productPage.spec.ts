import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/.*Products/);
});

test("has search bar", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByRole("search")).toBeVisible();
});

//axe audits per page
test("Product page has no accessibility violations", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
