const { test, expect } = require('@playwright/test');

test.describe('Nykaa Website', () => {
  test.setTimeout(100000);

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.nykaa.com/', { waitUntil: 'networkidle' });
  });

  test('should load the homepage and verify title', async ({ page }) => {
   
    await expect(page).toHaveTitle(/Buy Cosmetics Products & Beauty Products Online in India at Best Price | Nykaa/);

    const searchInput = page.locator('input[placeholder="Search on Nykaa"]');
    await expect(searchInput).toBeVisible();
  });

  test('should be able to search for a product', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search on Nykaa"]');
  
    await searchInput.click();
    await searchInput.fill('Lipstick');

    await page.keyboard.press('Enter');

  });

  test('should apply filters on search results', async ({ page }) => {
  
    const searchInput = page.locator('input[placeholder="Search on Nykaa"]');
    await searchInput.click();
    await searchInput.fill('Lipstick');
    await page.keyboard.press('Enter');

  });

   test('should verify the presence and attributes of the HeaderNav list', async ({ page }) => {

    const headerNavList = page.locator('ul.HeaderNav.css-f7ogli');

    await expect(headerNavList).toBeVisible();

    const listItem = headerNavList.locator('li');
    await expect(listItem).toBeVisible();

    const link = listItem.locator('a#category');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
    await expect(link).toHaveText('categories');
  });

  test('should navigate to a category page', async ({ page }) => {
    
    const makeupCategory = page.locator('a:has-text("makeup")');
    await makeupCategory.hover();

    const lipstickSubCategory = page.locator('a:has-text("Lipstick")');
    await lipstickSubCategory.click();

  });

  test('should display the "Makeup" link after hovering on Makeup tab', async ({ page }) => {

    const makeupTab = page.locator('a', { hasText: 'Makeup' });
    await makeupTab.hover();

    const makeupSaleLink = page.locator('a[href="https://www.nykaa.com/sp/rakhi-makeup-sale/rakhi-makeup-sale"]');
    await expect(makeupSaleLink).toBeVisible();

    await expect(makeupSaleLink).toHaveAttribute('href', 'https://www.nykaa.com/sp/rakhi-makeup-sale/rakhi-makeup-sale');
    await makeupSaleLink.click();  

    await expect(page).toHaveURL('https://www.nykaa.com/sp/rakhi-makeup-sale/rakhi-makeup-sale');
  });
});
