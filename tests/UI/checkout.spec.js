const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');

const loginData = require('../../test-data/loginData.json');
const cartData = require('../../test-data/cart.json');
const checkoutData = require('../../test-data/checkout.json');


test.describe('Checkout Information Feature', () => {

    let inventoryPage;
    let cartPage;
    let checkoutPage;


  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page)
      .toHaveURL(/inventory/);

    await inventoryPage.addProductToCart(
      cartData.checkout.product.id
    );

    await page.locator('[data-test="shopping-cart-link"]').click();

    await cartPage.checkout();

    await expect(page)
      .toHaveURL(/checkout-step-one/);

  });

  test('Submit checkout with valid customer information', async ({ page }) => {

    const data = checkoutData.validCustomer;
    await checkoutPage.fillCustomerInformation(
      data.firstName,
      data.lastName,
      data.postalCode
    );
    await checkoutPage.continueCheckout();
    await expect(page)
      .toHaveURL(
        new RegExp(
          data.expectedUrl
        )
      );

  });

  test('Checkout validation - First Name required', async () => {

    const data = checkoutData.emptyFirstName;


    await checkoutPage.fillCustomerInformation(
      data.firstName,
      data.lastName,
      data.postalCode
    );


    await checkoutPage.continueCheckout();


    await checkoutPage.verifyErrorMessage(
      data.expectedError
    );

  });


  test('Checkout validation - Last Name required', async () => {

    const data = checkoutData.emptyLastName;


    await checkoutPage.fillCustomerInformation(
      data.firstName,
      data.lastName,
      data.postalCode
    );


    await checkoutPage.continueCheckout();


    await checkoutPage.verifyErrorMessage(
      data.expectedError
    );

  });


  test('Checkout validation - Postal Code required', async () => {

    const data = checkoutData.emptyPostalCode;


    await checkoutPage.fillCustomerInformation(
      data.firstName,
      data.lastName,
      data.postalCode
    );


    await checkoutPage.continueCheckout();


    await checkoutPage.verifyErrorMessage(
      data.expectedError
    );

  });

});