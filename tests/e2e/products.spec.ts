import { test, expect } from '@playwright/test';
import { erroUser, validLogin } from '../lib/e2e-navigations';
import { addBackPackToCartButton, addBoltTshirt, backPackName, removeBackPackFromCartButton, removeBoltTshirt } from '../lib/consts';

test.describe('Products', () => {
    test('Access the product', async ({ page }) => {
       await validLogin(page);
       await page.locator(backPackName).first().click();
       await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); 
    });

    test('Add a product to the cart', async ({ page }) => {
        await erroUser(page);
        await page.locator(addBoltTshirt).click();
        await expect(page.locator(removeBoltTshirt)).toBeVisible();
    })

    test('Remove a product from the cart', async ({ page }) => {
       await erroUser(page);
       await page.locator(addBackPackToCartButton).click(); 
       await page.locator(removeBackPackFromCartButton).click();
       await expect(page.locator(addBackPackToCartButton)).toBeVisible();
    });
})