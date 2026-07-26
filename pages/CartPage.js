const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;

        this.cartTitle = page.locator('[data-test="title"]');
        this.cartList = page.getByTestId('cart-list');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.cartItemPrices = page.locator('.inventory_item_price');
        this.cartItemQuantities = page.locator('.cart_quantity');
    }

    // Actions
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async removeProduct(productId) {
        await this.page.locator(`[data-test="remove-${productId}"]`).click();
    }
    async openProduct(productName) {
        await this.page.getByRole('link', { name: productName }).click();
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getCartItemNames() {
        return await this.cartItemNames.allTextContents();
    }

    async getCartItemPrices() {
        return await this.cartItemPrices.allTextContents();
    }

    async getCartItemQuantities() {
        return await this.cartItemQuantities.allTextContents();
    }

    // Assertions
    async verifyCartPageDisplayed() {
        await expect(this.cartTitle).toHaveText('Your Cart');
    }

    async verifyCartItemCount(expectedCount) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async verifyProductExists(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async verifyProductRemoved(productName) {
        await expect(this.page.getByText(productName)).not.toBeVisible();
    }

    async verifyCheckoutButtonVisible() {
        await expect(this.checkoutButton).toBeVisible();
    }

    async verifyContinueShoppingButtonVisible() {
        await expect(this.continueShoppingButton).toBeVisible();
    }
}

module.exports = CartPage;