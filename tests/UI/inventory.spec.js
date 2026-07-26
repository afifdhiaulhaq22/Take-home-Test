const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const loginData = require('../../test-data/loginData.json');
const InventoryPage = require('../../pages/InventoryPage');
const inventoryData = require('../../test-data/inventory.json');



test.describe('Inventory Feature', () => {

    let inventoryPage;


    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
        await expect(page).toHaveURL(/inventory/);
    });


    test('Verifikasi daftar produk', async ({ page }) => {
        const products = page.locator('.inventory_item');
        await expect(products).toHaveCount(inventoryData.expectedProductCount);
    });


    test('Sort products Name A-Z', async ({ page }) => {
        await inventoryPage.sortProducts(inventoryData.sorting.nameAZ.option);
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        expect(productNames).toEqual([...productNames].sort());
    });


    test('Sort products Name Z-A', async ({ page }) => {
        await inventoryPage.sortProducts(inventoryData.sorting.nameZA.option);
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        expect(productNames).toEqual([...productNames].sort().reverse());
    });


    test('Sort products Price Low-High', async ({ page }) => {
        await inventoryPage.sortProducts(inventoryData.sorting.priceLowHigh.option);
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const priceValues = prices.map(price => Number(price.replace('$', '')));
        expect(priceValues).toEqual([...priceValues].sort((a, b) => a - b));
    });


    test('Sort products Price High-Low', async ({ page }) => {
        await inventoryPage.sortProducts(inventoryData.sorting.priceHighLow.option);
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const priceValues = prices.map(price =>Number(price.replace('$', '')));
        expect(priceValues).toEqual([...priceValues].sort((a, b) => b - a));

    });
    test('Tambah 1 produk', async ({page}) => {
        const data = inventoryData.addToCart.singleProduct;
        for (const product of data.products) {
            await inventoryPage.addProductToCart(product);
            await inventoryPage.verifyProductAdded(product);
        }
        await inventoryPage.verifyCartBadge(
            data.expectedCartBadge
        );
    });


    test('Tambah 3 produk', async ({page}) => {
        const data = inventoryData.addToCart.multipleProducts;
        for (const product of data.products) {
            await inventoryPage.addProductToCart(product);
            await inventoryPage.verifyProductAdded(product);
        }
        await inventoryPage.verifyCartBadge(
            data.expectedCartBadge
        );
    });

});