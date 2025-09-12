import { test, expect } from "@playwright/test";

test.describe("Jeli.ai smoke", () => {
  test("home renders and nav works", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Jeli\.ai/i);

    await expect(page.getByRole("link", { name: /jeli\.ai|jeli/i })).toBeVisible();

    const cta = page.getByRole("link", { name: /Try Jeli Now/i }).or(page.getByRole("button", { name: /Get Started/i }));
    await expect(cta).toBeVisible();

    await page.getByRole("link", { name: /Dashboard/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();
  });

  test("health API responds", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe("ok");
  });
});
