## Playwright Web Automation Hackathon Project
 
#### Web Scraping and Automation with Playwright & JavaScript | IKEA Product Search
##### Website URL : https://www.ikea.com/in/en/

A Robust testing, filtering, and data extraction of product details from [IKEA India](https://www.ikea.com/in/en/) using Playwright & JavaScript. This project showcases advanced browser automation, search functionality, and scraping techniques implemented with the Page Object Model (POM) design pattern.


###  Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Design Principles](#design-principles)
- [Installation](#installation)
- [Configuration](#configuration)
- [How to Write and Organize Tests](#how-to-write-and-organize-tests)
- [Running Tests](#running-tests)
- [Key Methods](#key-methods)
- [Web Scraping & Data Output](#web-scraping--data-output)
- [Viewing Reports](#viewing-reports)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

 
### Project Overview
 
This repository provides a complete setup for E2E testing and web scraping using Playwright with JavaScript. It includes:
 
- Automated browser tests for [IKEA](#https://www.ikea.com/in/en/) E-Commerce web application.
- Page Object Model (POM) for maintainable and reusable code.
- Data extraction and saving results to JSON and CSV.
- HTML and JSON reporting for test results.
- Screenshots and Allure reports.
 
---
 
### Directory Structure
 
```
.
├── data/
|   ├── bookshelvespage.csv
│   └── bookspageresults.json
├── pages/                 # Page Object classes
│   ├── BasePage.js
|   ├── HomePage.js
│   ├── BooksShelvesPage.js
|   ├── StudyChairPage.js
|   ├── GiftCardPage.js
│   ├── PaymentPage.js
│   
├── reports/
│   └── index.html
├── screenshots/            # Captured screenshots from failed tests
|   ├── image.png
|   └── image2.png
├── test-results/
├── tests/
│   ├── main.spec.js
|   └── ikea.spec.js
├── utils/                  # Custom utilities
│   └── csvWriter.js
|
├── package.json
├── playwright.config.js    # Playwright setup and reporter config
```
 
### Design Principles

- **Modular POM Design**: Each page component is encapsulated in reusable classes.
- **Maintainability**: Easy to update locators and actions.
- **Separation of Concerns**: Utility functions, test cases, and page interactions are isolated.

---
 
## Installation
 
1. **Clone the repository:**
   ```sh
   https://github.com/bala-vikash/IKEA-Automation.git
   cd IKEA-Automation
   ```
2. **Install Node.js**  
   Make sure you have Node.js (version 16 or higher recommended) installed. You can check with:

   ```sh
    node --version 
    npm -version
   ```
    If not, download and install from [NodeJs](https://nodejs.org/).
    
    Download the LTS version.

3. **Add dependency and install browsers :**
   ```sh
    npm i -D @playwright/test
    # install supported browsers
    npx playwright install
   ```
 
4. **Install dependencies:**
   ```sh
   npm install
   ```
 
5. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```
 
 
### Configuration
 
- **playwright.config.js**: Configure test settings, timeouts, browser options, and reporters.
- **You can adjust timeouts, enable video/screenshot capture, and configure parallel workers.**
 
 
 
### How to Write and Organize Tests
 
- Place new test files in the `tests/` directory.
- Use the Page Object Model classes from `pages/` for actions and assertions.
- Example test file: `tests/example.spec.js`
 
 
### Running Tests
 
- **Run all tests:**
  ```sh
  npx playwright test
  ```
 
- **Run a specific test file:**
  ```sh
  npx playwright test tests/main.spec.js
  ```
 
- **Run a specific test using chromium and in headed mode**
  ```sh
  npx playwright test tests/main.spec.js --project chromium --headed
  ```

- **Run a specific test using chromium and webkit**
  ```sh
  npx playwright test tests/main.spec.js --project chromium --project webkit
  ```

- **Run last failed tests**
  ```sh
  npx playwright test --last-failed
  ```


 
- **View HTML report:**
  ```sh
  npx playwright show-report
  ```



**Generate Allure Reports** :
1. To Install allure through Command Line 
```sh
  npm install allure-playwright

  npm install allure-commandline --save-dev
```
2. To Serve Allure reports
```sh
 1. allure generate ./allure-results -o ./allure-report --clean
 2. allure open allure-report
 ```



## Key Methods

### HomePage.js
- `navigateToHome()` : Navigates to the IKEA India homepage.

- `searchProduct(productName)` : Executes a product search using the search bar.

---

### BooksShelvesPage.js
- `filterByType()` : Applies category filters to show bookshelf products.

- `scrapeProductDetails()` : Scrapes titles, prices, and product links from the bookshelf listing page.

---

### StudyChairPage.js
- `applyFilters()` : Applies relevant filters for study chairs.

- `scrapeChairDetails()` : Extracts details like model name, price, and availability from study chair listings.

---

### GiftCardPage.js
- `navigateToGiftCards()` : Navigates to the gift card section of the IKEA site.

- `selectGiftValue(value)` : Selects the specified gift card amount for purchase.

---


### Utils/csvWriter.js
- `writeToCSV(filename, data)` : Saves scraped data into a CSV file with the specified filename.
- 


### Web Scraping & Data Output

This project enables scraping product details from IKEA’s website using Playwright. The data includes:

- 🏷️ Product Names
- 💰 Prices
- 🔗 Product URLs
- 📦 Categories (e.g., Bookshelves, Study Chairs)

### Output Formats

Scraped data is saved in the following formats:
- **JSON** → `data/bookspageresults.json`
- **CSV** → `data/bookshelvespage.csv`

To trigger scraping, the corresponding test spec (e.g., `ikea.spec.js`) invokes methods from `BooksShelvesPage.js` and other page classes to collect and save data.

---

### Viewing Reports

After running tests, you can view detailed test and scraping results using Playwright’s built-in reporting tools.

- **HTML Report:**
  ```sh
  npx playwright show-report
  ```
### Troubleshooting
 
- **Selectors not found:** Inspect the target website and update selectors in the page object classes.
- **Timeouts:** Adjust timeouts in `playwright.config.js` or in your page object methods.
- **No results scraped:** Ensure the selectors match the current website structure.
 
 
### Contributing
 
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.
 
---