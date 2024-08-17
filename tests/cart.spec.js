const { test, expect } = require('@playwright/test');

test.describe('Nykaa Website', () => {
  test.setTimeout(100000);

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.nykaa.com/', { waitUntil: 'networkidle' });
  });


test('should add a product to cart', async ({ page }) => {

    const searchInput = page.locator('input[placeholder="Search on Nykaa"]');
    await searchInput.click();
    await searchInput.fill('Lipstick');
    await page.keyboard.press('Enter');

   
    const searchResults = page.locator('div[class*="product-list"]');
    await expect(searchResults).toBeVisible();

    await addToCartButton.click();
   
  });

});