const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.checkoutTitle = page.getByTestId('title');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    // Actions
    async fillCustomerInformation(firstName,lastName,postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async enterFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }
    async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }
    async enterPostalCode(postalCode) {
        await this.postalCodeInput.fill(postalCode);
    }
    async continueCheckout() {
        await this.continueButton.click();
    }
    async cancelCheckout() {
        await this.cancelButton.click();
    }
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }


    // Assertions
    async verifyCheckoutPageDisplayed() {
        await expect(this.checkoutTitle).toHaveText('Checkout: Your Information');
    }
    async verifyInputFieldsDisplayed() {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }


    async verifyContinueButtonDisplayed() {
        await expect(this.continueButton).toBeVisible();
    }


    async verifyErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

}

module.exports = CheckoutPage;