import { test, expect } from '@playwright/test';
import { validLogin } from '../lib/e2e-navigations';
import { lockedUser, loginButton, password, passwordField, productsTitle, username, usernameField } from '../lib/consts';
import { faker } from '@faker-js/faker';

test.describe('Valid login flow', () => {
    test('Valid login', async ({ page }) => {
        await validLogin(page);
        await expect(page.locator(productsTitle)).toContainText('Product');
    });
});

test.describe('Invalid login flow', () => {
    test('Invalid login - Empty password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(usernameField).fill(username);
        await page.locator(loginButton).click();
        await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    });

    test('Invalid login - Empty username', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(passwordField).fill(password);
        await page.locator(loginButton).click();
        await expect(page.getByText('Username is required', { exact: true })).toBeVisible();
    });

    test('Invalid login - Empty username and password fields', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(loginButton).click();
        await expect(page.getByText('Username is required', { exact: true })).toBeVisible();
    });

    test('Invalid login - Not registered account', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(usernameField).fill(faker.internet.userName());
        await page.locator(passwordField).fill(password);
        await page.locator(loginButton).click();
        await expect(page.getByText('Username and password do not match any user in this service', { exact: true })).toBeVisible();
    });

    test('Invalid login - Wrong password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(usernameField).fill(username);
        await page.locator(passwordField).fill(faker.internet.password());
        await page.locator(loginButton).click();
        await expect(page.getByText('Username and password do not match any user in this service', { exact: true })).toBeVisible();
    });

    test('Invalid login - Locked out user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator(usernameField).fill(lockedUser);
        await page.locator(passwordField).fill(password);
        await page.locator(loginButton).click();
        await expect(page.getByText('Sorry, this user has been locked out.', { exact: true })).toBeVisible();
    });
});
