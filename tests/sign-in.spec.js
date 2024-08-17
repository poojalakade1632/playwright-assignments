const { test, expect } = require('@playwright/test');

test.describe('Nykaa Website', () => {
  test.setTimeout(100000);

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.nykaa.com/', { waitUntil: 'networkidle' });
  });

  test('should open login modal', async ({ page }) => {

    const loginButton = page.locator('a:has-text("Sign in")');
    await loginButton.click();

    const loginModal = page.locator('div[class*="login-signup"]');
    await expect(loginModal).toBeVisible();

    const mobileInput = loginModal.locator('input[type="tel"]');
    await expect(mobileInput).toBeVisible();
  });

  test('should show error message for invalid login', async ({ page }) => {
   
    const loginButton = page.locator('a:has-text("Sign in")');
    await loginButton.click();

    const loginModal = page.locator('div[class*="login-signup"]');

    const continueButton = loginModal.locator('button:has-text("continue")');
    await continueButton.click();

    const errorMessage = loginModal.locator('span:has-text("Invalid phone number")');
    await expect(errorMessage).toBeVisible();
  });
});