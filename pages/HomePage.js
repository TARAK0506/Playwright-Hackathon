const { expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const convertToCSV = require('../utils/csvWriter');
const BasePage = require("./BasePage");

class Homepage extends BasePage{
  constructor(page) {
    super(page);
    this.page = page;
    this.url = "https://www.ikea.com/in/en/";
    this.searchBar = page.locator("#ikea-search-input");
    this.collectionItems = page.locator('//div[contains(@id,"hnf-carousel__tabs-navigation-products")]/div/a/span');
    this.giftCardLink = page.locator('a[href="https://www.ikea.com/in/en/customer-service/ikea-gift-cards-pub004138e1/"]');
  }

  async goHome() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveTitle(/IKEA India/);
  }

  async saveHomeCollections() {
    const count = await this.collectionItems.count();
    const data = [];

    for (let i = 1; i < count; i++) {
      const text = await this.collectionItems.nth(i).textContent();
      if (text) {
        data.push({ i, name: text.trim() });
      }
    }

    const csvContent = convertToCSV(data);
    const filename = `collectionItems.csv`;

    const outputDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, csvContent, "utf8");
  }

  async findShelves() {
    await this.searchBar.click();
    await this.searchBar.fill("BookShelves");
    await this.page.keyboard.press("Enter");
  }

  async performSearch(inputText) {
    await this.searchBar.click();
    await this.searchBar.fill(inputText);
    await this.page.keyboard.press("Enter");
  }

  async getChair() {
    await this.searchBar.click();
    await this.searchBar.fill("Study Chair");
    await this.page.keyboard.press("Enter");
  }

  async goToGiftCard() {
    await this.giftCardLink.click();
  }
}

module.exports = Homepage;
