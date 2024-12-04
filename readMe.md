# Amazon Test Automation

## Overview

1. Navigating to the website.
2. Searching for products based on a list.
3. Adding products with a specific rating to the cart.
4. Validating that the product is successfully added to the cart.

# TechStack

PlayWright for Browser Automation.

dotenv for environment variable management.

Programming Language javaScript.

# Setup

npm install --save-dev @playwright/test.

npx playwright --version.

npx playwright install.

npm install dotenv.

# Run

npx playwright test tests/specs/validateAddToCart.spec.js

# Project Structure

```sh
├── pages/
│   ├── home.page.js  
│   ├── cart.page.js  
├── tests/
│   ├── test.spec.js  
├── .env  
├── README.md  
├── package.json
```