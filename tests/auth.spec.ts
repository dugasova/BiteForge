import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should show validation error for short password on Sign Up", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/signup");

    // Fill in a valid email but a short password (less than 6 chars)
    await page.getByPlaceholder(/email/i).fill("test@example.com");
    await page.getByPlaceholder(/password/i).fill("123");

    // The "Sign Up" button should be disabled because of validation
    const signUpButton = page
      // .getByRole("button", { name: /sign up/i })
      .locator(".signup__form__button");
    await expect(signUpButton).toBeDisabled();

    // Error message should be visible
    await expect(page.getByText(/at least 6 characters/i)).toBeVisible();
  });

  test("should allow a user to sign up and then log out", async ({ page }) => {
    // Generate a random email to avoid "account already exists" errors
    const randomEmail = `testuser_${Date.now()}@example.com`;

    await page.goto("http://localhost:5173/signup");

    // 1. Sign Up
    await page.getByPlaceholder(/email/i).fill(randomEmail);
    await page.getByPlaceholder(/password/i).fill("password123");

    const signUpButton = page.locator(".signup__form__button");
    // getByRole("button", { name: /sign up/i });
    await signUpButton.click();

    // Should redirect to home page
    await expect(page).toHaveURL("http://localhost:5173/");

    // Header should now show "Logout" instead of "Login"
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /account/i })).toBeVisible();

    // 2. Log Out
    await page.getByRole("button", { name: /logout/i }).click();

    // Header should show "Login" again
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("should show error for invalid login credentials", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByPlaceholder(/email/i).fill("nonexistent@user.com");
    await page.getByPlaceholder(/password/i).fill("wrongpassword");

    await page.locator(".login__form__button").click();

    // Should show error message from Firebase
    // Either the hardcoded one "Something went wrong" or specific Firebase error
    await expect(page.locator(".error")).toBeVisible();
  });
});
