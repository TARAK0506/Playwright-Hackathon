// pages/StudyPage.js
const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
const convertToCSV = require('../utils/csvWriter');

class StudyPage {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator("//input[@id='ikea-search-input']");
    this.filtersButton = page.getByRole("button", { name: "All filters" });
    this.customerRatingSection = page.locator("//span[@id='SEC_RATINGS_title']");
    this.selectFourStarRating = page.locator('//div[@id="SEC_RATINGS"]/div/div/fieldset/label[1]/span[1]');
    this.viewResultsButton = page.locator("//button[@aria-label='View 41']");
    this.productCardPrices = page.locator("[data-testid='plp-product-card']").locator(".plp-mastercard__price");
  }

  async openAllFiltersPanel() {
    await this.filtersButton.click();
  }

  async openCustomerRatingFilter() {
    await this.customerRatingSection.click();
  }

  async applyFourStarRatingFilter() {
    await this.selectFourStarRating.click();
  }

  async expandSearchResults() {
    await this.viewResultsButton.click();
  }

  async captureChairProductDetailsToCSV() {
    const chairProducts = [];

    for (let i = 0; i < 3; i++) {
      const title = await this.productCardPrices.nth(i).locator(".plp-price-module__product-name").textContent();
      const price = await this.productCardPrices.nth(i).locator(".plp-price__sr-text").textContent();
      chairProducts.push({ title, price });
    }

    const csvData = convertToCSV(chairProducts);
    // const timestamp = getTimestamp();
    const filePath = path.join(__dirname, '..', 'output', `study-chairs.csv`);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, csvData, 'utf8');
  }

  async verifyLandingPageURL() {
    await expect(this.page).toHaveURL('https://www.ikea.com/in/en/');
  }
}

module.exports = StudyPage;
