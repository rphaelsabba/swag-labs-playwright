import { test, expect } from '@playwright/test';
import { validLogin } from '../lib/e2e-navigations';
import { beforeEach } from 'node:test';
import { aboutLink, addBackPackToCartButton, allItemsLink, logoutLink, removeBackPackFromCartButton, resetAppStateLink, sidebar } from '../lib/consts';

test.describe('Sidebar', () => {
    test.beforeEach(async ({ page }) => {
        await validLogin(page)
    })

    test('Sidebar options', async ({ page }) => {
       await page.locator(sidebar).click();
       await expect(page.locator(allItemsLink)).toContainText('All Items');
       await expect(page.locator(aboutLink)).toContainText('About'); 
       await expect(page.locator(logoutLink)).toContainText('Logout');
       await expect(page.locator(resetAppStateLink)).toContainText('Reset App State');
    });

    test('Sidebar - Logout', async ({ page }) => {
        await page.locator(sidebar).click();
        await page.locator(logoutLink).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Sidebar - Reset App State', async ({ page }) => {
        await page.locator(addBackPackToCartButton).click();
        await page.locator(sidebar).click();
        await page.locator(resetAppStateLink).click();
        await expect(page.locator(removeBackPackFromCartButton)).toBeHidden();
    });
});