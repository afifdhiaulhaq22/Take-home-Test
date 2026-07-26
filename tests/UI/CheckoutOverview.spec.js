const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const CheckoutOverviewPage = require('../../pages/CheckoutOverviewPage');

const loginData = require('../../test-data/loginData.json');
const checkoutOverviewData = require('../../test-data/checkoutOverview.json');


test.describe('Checkout Overview Feature', () => {

  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;


  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);

    await loginPage.goto();
    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );
    await expect(page).toHaveURL(/inventory/);

    for (const product of checkoutOverviewData.verifyItems.products) {
      await inventoryPage.addProductToCart(product.id);
    }

    await page.locator('[data-test="shopping-cart-link"]').click();
    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      "John",
      "Doe",
      "12345"
    );
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('Verify checkout overview items match cart items', async () => {
    const data = checkoutOverviewData.verifyItems;
    await checkoutOverviewPage.verifyItemsCount(data.expectedItemCount);
    await checkoutOverviewPage.verifyItems(
        data.products.map(
          product => product.name
        )
    );
  });

  test('Finish checkout successfully', async ({ page }) => {
    const data =checkoutOverviewData.finishCheckout;
    await checkoutOverviewPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);
  });



});