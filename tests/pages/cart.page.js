
class CartPage {
    constructor(page) {
        this.page = page;
        this.elements = {
            cartButton: `.nav-a#nav-cart`,
            shoppingCartTitle: `#sc-active-cart .sc-cart-header`,
            activeItemList: `[data-name='Active Items'] div[data-csa-c-owner="CartX"]`,
            activeItemListTitle: `.sc-grid-item-product-title`
        };
    }

    async navigateToCart() {
        await this.page.click(this.elements.cartButton);
        await this.page.waitForSelector(this.elements.shoppingCartTitle,{timeout: 10000});
    }

    async validateProductAddedToCart(productName) {
        await this.page.waitForSelector(this.elements.activeItemList);
        const activeItemList = this.page.locator(this.elements.activeItemList);
        const count = await activeItemList.count();
        let productFound = false;
        for (let i = 0; i < count; i++) {
            const product = activeItemList.nth(i);
            console.log((await product.locator(this.elements.activeItemListTitle).nth(i).textContent()).trim());
            const title = (await product.locator(this.elements.activeItemListTitle).nth(i).textContent()).trim();
            if (title.includes(productName.trim())) {
                productFound = true;
                break;
            }
        }
        return productFound;
    }
}module.exports = CartPage;
