import { test, expect } from "@playwright/test";

test.describe("Burger Builder Flow", () => {
  test("should allow user to build a burger and see the price change", async ({
    page,
  }) => {
    // 1. Start on the home page
    await page.goto("/");

    // Verify initial state using specific container to avoid strict mode violations
    const totalPrice = page.locator(".total-price");
    await expect(totalPrice).toContainText("10 UAH");
    await expect(page.locator(".total-kcal")).toContainText("200 kcal");

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

    // 4. Open Checkout and verify the order summary
    await page.getByRole("button", { name: /checkout/i }).click();
    await expect(
      page.getByRole("heading", { name: /your order summary/i }),
    ).toBeVisible();
  });

  test("should reset the burger when Reset button is clicked", async ({
    page,
  }) => {
    await page.goto("/");

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

  test("should add and remove ingredients, view checkout modal and toggle fast delivery", async ({ page }) => {
    await page.goto("/");

    // Check that we're on the Builder page and there are no ingredients yet
    await expect(page.locator(".burger-message")).toBeVisible();

    const totalPrice = page.locator(".total-price");
    const totalKcal = page.locator(".total-kcal");
    const initialPriceText = await totalPrice.innerText();
    const initialKcalText = await totalKcal.innerText();

    // Locate Bacon controls
    const baconControl = page.locator("li.ingredient-control", {
      has: page.getByAltText("bacon"),
    });
    const baconAddButton = baconControl.getByRole("button", { name: "+" });
    const baconRemoveButton = baconControl.getByRole("button", { name: "-" });

    // Add 2 Bacon
    await baconAddButton.click();
    await baconAddButton.click();
    await expect(baconControl.locator(".ingredient-quantity")).toHaveText("2");

    // Add 1 Cheese
    const cheeseControl = page.locator("li.ingredient-control", {
      has: page.getByAltText("cheese"),
    });
    await cheeseControl.getByRole("button", { name: "+" }).click();

    // Total price and kcal should be updated
    const updatedPriceText = await totalPrice.innerText();
    expect(updatedPriceText).not.toEqual(initialPriceText);

    const updatedKcalText = await totalKcal.innerText();
    expect(updatedKcalText).not.toEqual(initialKcalText);

    // Remove 1 Bacon
    await baconRemoveButton.click();
    await expect(baconControl.locator(".ingredient-quantity")).toHaveText("1");

    // Open Checkout modal
    await page.locator(".checkout-button").click();
    const modal = page.locator(".checkout-wrapper");
    await expect(modal).toBeVisible();

    // Verify ingredients in the checkout summary
    await expect(modal.locator(".ingredients-list")).toContainText("bacon x1");
    await expect(modal.locator(".ingredients-list")).toContainText("cheese x1");

    // Toggling Fast Delivery should change the total cost in the modal
    const checkoutTotal = modal.locator(".checkout-total").last().locator(".total-price");
    const modalInitialTotal = await checkoutTotal.innerText();

    await page.locator('label[for="checkout-fast-delivery"]').click();

    const modalUpdatedTotal = await checkoutTotal.innerText();
    expect(modalUpdatedTotal).not.toEqual(modalInitialTotal); // Should increase by 20 UAH

    // Close checkout modal
    await modal.locator(".close-button").click();
    await expect(modal).not.toBeVisible();

    // Reset builder
    await page.locator(".reset-button").click();
    await expect(page.locator(".burger-message")).toBeVisible();
  });

  test("should allow a guest to complete a checkout flow", async ({ page }) => {
    await page.goto("/");

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

    // 6. Verify success toast (checkout.toastSuccess)
    await expect(page.getByText("Burger saved successfully")).toBeVisible();
  });
});
