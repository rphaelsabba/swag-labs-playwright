import { Page } from '@playwright/test';
import { addBackPackToCartButton, addBikeLightToCartButton, cartButton, errorUser, loginButton, password, passwordField, username, usernameField } from './consts';

export async function validLogin(page: Page): Promise<void> {
    await page.goto('https://www.saucedemo.com/');
    await page.locator(usernameField).fill(username);
    await page.locator(passwordField).fill(password);
    await page.locator(loginButton).click();
}

export async function erroUser(page: Page): Promise<void> {
    await page.goto('https://www.saucedemo.com/');
    await page.locator(usernameField).fill(errorUser);
    await page.locator(passwordField).fill(password);
    await page.locator(loginButton).click();
}

export async function addProductToCart(page: Page): Promise<void> {
    await page.locator(addBackPackToCartButton).click();
    await page.locator(cartButton).click();
}

export async function addTwoProductsToCart(page: Page): Promise<void> {
    await page.locator(addBackPackToCartButton).click();
    await page.locator(addBikeLightToCartButton).click();
    await page.locator(cartButton).click();
}