const { expect } = require('@playwright/test');

class CheckoutOverviewPage {

  constructor(page) {
    this.page = page;

    this.checkoutTitle = page.getByTestId('title');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.paymentInformation = page.locator('.summary_info_label');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.getByTestId('cancel');
  }

    // Actions
    async finishCheckout() {
        await this.finishButton.click();
    }
    async cancelCheckout() {
        await this.cancelButton.click();
    }
    async getItemNames() {
        return await this.itemNames.allTextContents();
    }
    async getItemPrices() {
        return await this.itemPrices.allTextContents();
    }
    async getItemTotal() {
        return await this.itemTotal.textContent();
    }
    async getTax() {
        return await this.tax.textContent();
    }
    async getTotal() {
        return await this.total.textContent();
    }
    async getCartItemCount() {
        return await this.cartItems.count();
    }
    
    // Assertions
    async verifyCheckoutOverviewDisplayed() {
        await expect(this.checkoutTitle).toHaveText('Checkout: Overview');
    }
    async verifyItemsCount(expectedCount) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }
    async verifyItems(expectedItems) {
        const actualItems =await this.getItemNames();
        expect(actualItems).toEqual(expectedItems);

    }
    async verifyFinishButtonDisplayed() {
        await expect(this.finishButton).toBeVisible();
    }
    async verifyCancelButtonDisplayed() {
        await expect(this.cancelButton).toBeVisible();
    }
    async verifyTotal(expectedTotal) {
        await expect(this.total).toHaveText(expectedTotal);
    }
}


module.exports = CheckoutOverviewPage;