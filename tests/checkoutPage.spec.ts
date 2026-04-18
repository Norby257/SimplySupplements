import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("checkout page (cart view) has no accessibility violations when cart is empty", async ({ page }) => {
  await page.getByRole("button", { name: /^cart,/i }).click();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("checkout page (cart view) has no accessibility violations with items in the cart", async ({ page }) => {
  await page.getByRole("button", { name: /add vitamin d3/i }).click();
  await page.getByRole("button", { name: /^cart,/i }).click();

  await expect(page.getByRole("heading", { name: "Your Cart", level: 1 })).toBeVisible();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("checkout page (order summary view) has no accessibility violations", async ({ page }) => {
  await page.getByRole("button", { name: /add vitamin d3/i }).click();
  await page.getByRole("button", { name: /^cart,/i }).click();
  await page.getByRole("button", { name: /proceed to checkout/i }).click();

  await expect(page.getByRole("heading", { name: "Checkout", level: 1 })).toBeVisible();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
