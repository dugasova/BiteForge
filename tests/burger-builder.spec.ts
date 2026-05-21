import { test, expect } from "@playwright/test";

test.describe("Burger Builder Flow", () => {
  test("should allow user to build a burger and see the price change", async ({
    page,
  }) => {
    // 1. Start on the home page
    await page.goto("http://localhost:5173");

    // Verify initial state using specific container to avoid strict mode violations
    const totalPrice = page.locator(".total-price");
    await expect(totalPrice).toContainText("10 UAH");
    await expect(page.locator(".total-kkal")).toContainText("200 kcal");

    // 2. Add some ingredients
    const baconControl = page.locator("li.ingredient-control", {
      has: page.getByAltText("bacon"),
    });
    await baconControl.getByRole("button", { name: "+" }).click();

    // Verify price updated (10 + 20)
    await expect(totalPrice).toContainText("30 UAH");

    // Add Cheese (price 25)
    const cheeseControl = page.locator("li.ingredient-control", {
      has: page.getByAltText("cheese"),
    });
    await cheeseControl.getByRole("button", { name: "+" }).click();

    // Verify price updated (30 + 25 = 55)
    await expect(totalPrice).toContainText("55 UAH");

    // 3. Verify ingredients are displayed in the burger
    // The ingredients are images with alt text matching the name
    await expect(
      page.locator('.ingredients-container img[alt="bacon"]'),
    ).toBeVisible();
    await expect(
      page.locator('.ingredients-container img[alt="cheese"]'),
    ).toBeVisible();

    // 4. Test the Checkout button
    await expect(
      page.getByRole("heading", { name: /your order summary/i }),
    ).toBeVisible();
  });

  test("should reset the burger when Reset button is clicked", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    // Add something
    const baconControl = page.locator("li.ingredient-control", {
      has: page.getByAltText("bacon"),
    });
    await baconControl.getByRole("button", { name: "+" }).click();

    const totalPrice = page.locator(".total-price");
    await expect(totalPrice).toContainText("30 UAH");

    // Click Reset
    await page.getByRole("button", { name: /reset/i }).click();

    // Verify it's back to initial state
    await expect(totalPrice).toContainText("10 UAH");
    await expect(
      page.locator('.ingredients-container img[alt="bacon"]'),
    ).not.toBeAttached();
  });

  test("should allow a guest to complete a checkout flow", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // 1. Build a quick burger
    // Patty (25) + Bun (10) = 35 UAH
    await page
      .locator("li.ingredient-control", { has: page.getByAltText("patty") })
      .getByRole("button", { name: "+" })
      .click();

    // 2. Open Checkout
    await page.getByRole("button", { name: /checkout/i }).click();

    // 3. Fill in the Guest Form using IDs
    await page.fill("#fullname", "John Doe");
    await page.fill("#email", `testuser_${Date.now()}@example.com`);
    await page.fill("#password", "safePassword123");
    await page.fill("#phoneNumber", "+380501234567");
    await page.fill("#deliveryAddress", "123 Main Street, Kyiv");

    // 4. Test Fast Delivery toggle (adds 20 UAH)
    // Initially 35 UAH
    const checkoutPrices = page.locator(".total-price");
    await expect(checkoutPrices.last()).toContainText("35 UAH");

    // Enable Fast Delivery
    await page.getByLabel(/fast delivery/i).click();

    // Now 35 + 20 = 55 UAH
    await expect(checkoutPrices.last()).toContainText("55 UAH");

    // 5. Confirm Order
    await page.getByRole("button", { name: /confirm order/i }).click();

    // 6. Verify success modal message (hardcoded in Checkout.tsx)
    await expect(page.getByText("Burger saved successfully")).toBeVisible();
  });
});
