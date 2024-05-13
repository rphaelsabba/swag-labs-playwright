import { test, expect } from '@playwright/test';
import { addProductToCart, addTwoProductsToCart, validLogin } from '../lib/e2e-navigations';
import { cartButton, checkoutButton, continueButton, finishButton, firstName, firstNameField, lastName, lastNameField, postalCode, postalCodeField } from '../lib/consts';

test.describe('Valid purchase', async () => {
    test.beforeEach(async ({ page }) => {
        await validLogin(page);
    })
    test('Buying one prodcut', async ({ page }) => {
        await addProductToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(firstNameField).fill(firstName);
        await page.locator(lastNameField).fill(lastName);
        await page.locator(postalCodeField).fill(postalCode);
        await page.locator(continueButton).click();
        //FINISH THE PURCHASE
        await page.locator(finishButton).click();
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });

    test('Buying two prodcuts', async ({ page }) => {
        await addTwoProductsToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(firstNameField).fill(firstName);
        await page.locator(lastNameField).fill(lastName);
        await page.locator(postalCodeField).fill(postalCode);
        await page.locator(continueButton).click();
        //FINISH THE PURCHASE
        await page.locator(finishButton).click();
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });
})

test.describe('Invalid purchases', async () => {
    test.beforeEach(async ({ page }) => {
        await validLogin(page);
    })
    test('No products selected', async ({ page }) => {
        await page.locator(cartButton).click();
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(firstNameField).fill(firstName);
        await page.locator(lastNameField).fill(lastName);
        await page.locator(postalCodeField).fill(postalCode);
        await page.locator(continueButton).click();
        //FINISH THE PURCHASE
        await page.locator(finishButton).click();
        await expect(page.getByText('Thank you for your order!')).toBeHidden();
    });

    test('First name empty', async ({ page }) => {
        await addProductToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(lastNameField).fill(lastName);
        await page.locator(postalCodeField).fill(postalCode);
        await page.locator(continueButton).click();
        await expect(page.getByText('Error: First Name is required')).toBeVisible();
    });

    test('Last name empty', async ({ page }) => {
        await addProductToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(firstNameField).fill(firstName);
        await page.locator(postalCodeField).fill(postalCode);
        await page.locator(continueButton).click();
        await expect(page.getByText('Error: Last Name is required')).toBeVisible();
    });

    test('Postal code empty', async ({ page }) => {
        await addProductToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(firstNameField).fill(firstName);
        await page.locator(lastNameField).fill(lastName);
        await page.locator(continueButton).click();
        await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
    });

    test('All the fields empty', async ({ page }) => {
        await addProductToCart(page);
        // CHECKOUT
        await page.locator(checkoutButton).click();
        // FILL CHECKOUT FORM
        await page.locator(continueButton).click();
        await expect(page.getByText('Error: First Name is required')).toBeVisible();
    });
});