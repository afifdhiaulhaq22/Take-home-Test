const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const cartData = require('../../test-data/cart.json');

const loginData = require('../../test-data/loginData.json');
const inventoryData = require('../../test-data/inventory.json');

test.describe('Cart Feature', () => {

    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
        await expect(page).toHaveURL(/inventory/);
    });

    test('Verify cart items match selected products', async ({ page }) => {
        const data = cartData.verifyCartItems;
        for (const product of data.products) {
            await inventoryPage.addProductToCart(product.id);
        }
        await page.locator('[data-test="shopping-cart-link"]').click();
        await cartPage.verifyCartPageDisplayed();
        await cartPage.verifyCartItemCount(data.expectedItemCount);
        expect(await cartPage.getCartItemNames()).toEqual(data.products.map(product => product.name));

    });

    test('Remove item from cart', async ({ page }) => {
        const data = cartData.removeItem;
        await inventoryPage.addProductToCart(data.product.id);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await cartPage.verifyCartItemCount(
            data.expectedItemCountBefore
        );
        await cartPage.removeProduct(data.product.id);
        await cartPage.verifyCartItemCount(
            data.expectedItemCountAfter
        );
    });

    test('Proceed to checkout', async ({ page }) => {
        const data = cartData.checkout;
        await inventoryPage.addProductToCart(data.product.id);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one.html/);
    });

});