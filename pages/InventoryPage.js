const { expect } = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.page = page;

        this.productSortDropdown = page.locator('[data-test="product-sort-container"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.backpackProduct = page.getByTestId('item-4-title-link');
        this.backpackImage = page.getByTestId('item-4-img-link');
        this.backpackRemoveButton = page.getByTestId('remove-sauce-labs-backpack');
    }


    // Actions
    async sortProducts(option) {
        await this.productSortDropdown.selectOption(option);
    }
    async openBackpackDetail() {
        await this.backpackProduct.click();
    }
    async openBackpackImage() {
        await this.backpackImage.click();
    }
    async addBackpackToCart() {
        await this.backpackAddButton.click();
    }
    async removeBackpackFromCart() {
        await this.backpackRemoveButton.click();
    }
    async getCartItemCount() {
        return await this.cartBadge.textContent();
    }
    async addProductToCart(productId) {
        await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
    }
    async getCartItemCount() {
        return await this.cartBadge.textContent();
    }


    // Assertions
    async verifyBackpackAddedToCart() {
        await expect(this.backpackRemoveButton).toBeVisible();
    }


    async verifyBackpackRemovedFromCart() {
        await expect(this.backpackAddButton).toBeVisible();
    }

    async verifyCartBadge(expectedCount) {
        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }

    async verifyProductAdded(productId) {
        await expect(this.page.locator(`[data-test="remove-${productId}"]`)).toBeVisible();
    }
}

module.exports = InventoryPage;