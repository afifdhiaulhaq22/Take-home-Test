const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const loginData = require('../../test-data/loginData.json');

test.describe('Login Feature', () => {
   let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login dengan user valid', async ({ page }) => {
    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login dengan password salah', async () => {
    await loginPage.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password
    );

    expect(await loginPage.getErrorMessage())
      .toContain(loginData.invalidPassword.expectedError);
  });

  test('Login tanpa username', async () => {
    await loginPage.login(
      loginData.emptyUsername.username,
      loginData.emptyUsername.password
    );

    expect(await loginPage.getErrorMessage())
      .toContain(loginData.emptyUsername.expectedError);
  });

  test('Login tanpa password', async () => {
    await loginPage.login(
      loginData.emptyPassword.username,
      loginData.emptyPassword.password
    );

    expect(await loginPage.getErrorMessage())
      .toContain(loginData.emptyPassword.expectedError);
  });

  test('Login dengan akun locked', async () => {
    await loginPage.login(
      loginData.lockedUser.username,
      loginData.lockedUser.password
    );

    expect(await loginPage.getErrorMessage())
      .toContain(loginData.lockedUser.expectedError);
  });

});


