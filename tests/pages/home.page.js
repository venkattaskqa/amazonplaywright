class HomePage {
    constructor(page) {
        this.page = page;
        this.elements = {
            homePageSearch: `#twotabsearchtextbox`,
            homePageSearchButton: `#nav-search-submit-button`,
            productContainers: `[data-component-type='s-search-result']`,
            productRatings: `[data-cy='reviews-block']>div>span[aria-label*='rating details']`,
            productTitile: `[data-cy="title-recipe"]>h2>a`,
            addProductToCart: `[data-csa-c-action-name="addToCart"]`,
        };
    }

    async searchProducts(searchItem) {
        await this.page.waitForSelector(this.elements.homePageSearch);
        await this.page.fill(this.elements.homePageSearch, searchItem);
        await this.page.click(this.elements.homePageSearchButton,{ force: true });
        await this.page.waitForTimeout(2000);
    }

    async addProductToCartByRating(ratingValue) {
        await this.page.waitForSelector(this.elements.productContainers);
        const productContainers = this.page.locator(this.elements.productContainers);
        const count = await productContainers.count();
        let productFound = false;
        let productTitle = "";
        for (let i = 0; i < count; i++) {
            const productContainer = productContainers.nth(i);
            const ratingElement = await productContainer.locator(this.elements.productRatings);
            if (await ratingElement.isVisible()==true) {
                const rating = parseInt((await ratingElement.textContent()).split(" ")[0]);
                if (rating >= ratingValue) {
                    productFound = true;
                    productTitle = await productContainer.locator(this.elements.productTitile).textContent();
                    await productContainer.locator(this.elements.addProductToCart).click({ force: true });
                    break;
                }
            }
        }
        await this.page.waitForTimeout(5000);
        return [productFound, productTitle];

    }

}module.exports = HomePage;