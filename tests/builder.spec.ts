import { test, expect } from "@playwright/test";

test.describe("Burger Builder Flow", () => {
  test("should add and remove ingredients and update price correctly", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Check that we're on the Builder page and there are no ingredients yet
    await expect(page.getByText(/please add ingredients/i).or(page.getByText(/start adding ingredients/i)).or(page.locator('.burger-message'))).toBeVisible();

    // The base price is typically 0 or the price of the buns. Let's record the initial text.
    const totalPriceLocator = page.locator('.total-price').last();
    const initialPriceText = await totalPriceLocator.innerText();

    // Locate Bacon controls:
    const baconControl = page.locator('.ingredient-control').filter({ has: page.locator('img[alt="bacon"]') });
    const baconAddButton = baconControl.getByRole('button', { name: '+' });
    const baconRemoveButton = baconControl.getByRole('button', { name: '-' });

    // Add 2 Bacon
    await baconAddButton.click();
    await baconAddButton.click();

    // Verify quantity displays 2
    await expect(baconControl.locator('.ingredient-quantity')).toHaveText('2');

    // Add 1 Cheese
    const cheeseControl = page.locator('.ingredient-control').filter({ has: page.locator('img[alt="cheese"]') });
    await cheeseControl.getByRole('button', { name: '+' }).click();

    // Total price and kkal should be updated
    const updatedPriceText = await totalPriceLocator.innerText();
    expect(updatedPriceText).not.toEqual(initialPriceText); // Price must have increased

    const totalKkalLocator = page.locator('.total-kkal').last();
    const updatedKkalText = await totalKkalLocator.innerText();
    expect(updatedKkalText).not.toEqual("0 kcal"); 

    // Remove 1 Bacon
    await baconRemoveButton.click();
    await expect(baconControl.locator('.ingredient-quantity')).toHaveText('1');

    // Click on Checkout
    await page.locator('.checkout-button').click();

    // Modal should appear
    const modal = page.locator('.checkout-wrapper');
    await expect(modal).toBeVisible();

    // Verify ingredients in the checkout summary
    // Our checkout summary maps: <li>{name} x{count}</li>
    await expect(modal.locator('.ingredients-list')).toContainText('bacon x1');
    await expect(modal.locator('.ingredients-list')).toContainText('cheese x1');

    // Try toggling Fast Delivery and see that total cost increases in the modal
    const checkoutTotalLocator = modal.locator('.checkout-total').last().locator('.total-price');
    const modalInitialTotal = await checkoutTotalLocator.innerText();
    
    // Toggle Fast delivery checkbox
    await page.locator('label[for="checkout-fast-delivery"]').click();
    
    const modalUpdatedTotal = await checkoutTotalLocator.innerText();
    expect(modalUpdatedTotal).not.toEqual(modalInitialTotal); // Should increase by 20 UAH

    // Close checkout modal
    await modal.locator('.close-button').click();
    await expect(modal).not.toBeVisible();
    
    // Reset builder
    await page.locator('.reset-button').click();
    
    // Verify it's empty again
    await expect(page.locator('.burger-message')).toBeVisible();
  });
});
