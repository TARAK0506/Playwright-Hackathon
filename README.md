### Playwright Web Automation Hackathon
### Website URL : https://www.ikea.com/in/en/
 
A robust end-to-end (E2E) testing and web scraping framework for web applications using Playwright and JavaScript. This project demonstrates browser automation, advanced search, and data extraction (scraping) from IKEA, following the Page Object Model (POM) design pattern.
 
 
## Project Overview
 
This repository provides a complete setup for E2E testing and web scraping using Playwright with JavaScript. It includes:
 
- Automated browser tests for [IKEA](#https://www.ikea.com/in/en/) E-Commerce web application.
- Page Object Model (POM) for maintainable and reusable code.
- Data extraction and saving results to JSON and CSV.
- HTML and JSON reporting for test results.
- Screenshots and Allure reports.
 
---
 
## Directory Structure
 
```
.
├── data/
|   ├── bookshelvespage.csv
│   └── bookspageresults.json
├── pages/                 # Page Object classes
│   ├── BasePage.js
│   ├── BooksShelvesPage.js
|   ├── StudyChairPage.js
|   ├── GiftCardPage.js
│   ├── HomePage.js
│   ├── LocatorsPage.js
│   └──
├── reports/
│   └── index.html
├── screenshots/            # Captured screenshots from failed tests
|   ├── 
|   └── 
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
 
 
## Configuration
 
- **playwright.config.js**: Configure test settings, timeouts, browser options, and reporters.
 
 
 
## How to Write and Organize Tests
 
- Place new test files in the `tests/` directory.
- Use the Page Object Model classes from `pages/` for actions and assertions.
- Example test file: `tests/example.spec.js`
 
 
## Running Tests
 
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
 
- **View HTML report:**
  ```sh
  npx playwright show-report
  ```
 
## Troubleshooting
 
- **Selectors not found:** Inspect the target website and update selectors in the page object classes.
- **Timeouts:** Adjust timeouts in `playwright.config.js` or in your page object methods.
- **No results scraped:** Ensure the selectors match the current website structure.
 
 
## Contributing
 
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.
 
---