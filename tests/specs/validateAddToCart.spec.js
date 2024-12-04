const { test, expect } = require('@playwright/test');
//import { expect, test } from '@playwright/test';

import * as dotenv from "dotenv";
dotenv.config();
const HomePage = require('../pages/home.page');

const CartPage = require('../pages/cart.page');

const productToSearch = process.env.SearchItemList.split(',');

test.describe('Validate Add To Product', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.Base_url,{waitUntil:'load'});
    });

    for (const value of productToSearch) {
        test(`Validating Add To Product for ${value}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const cartPage = new CartPage(page);
            console.log(`Processing: ${value}`);
            await homePage.searchProducts(value);
            let searchResult=await homePage.addProductToCartByRating(4);
            console.log(searchResult);
            if(searchResult[0]==true){
                await cartPage.navigateToCart();
                expect(await cartPage.validateProductAddedToCart(searchResult[1])).toBe(true);
            }
        });
    }
})