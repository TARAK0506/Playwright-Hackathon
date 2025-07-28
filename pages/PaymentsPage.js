const { expect } = require("@playwright/test");

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.debitCardOption = page.locator("#L02");
    this.cardTypeSelector = page.locator("#selectDebitCard");
    this.cardNumberInput = page.locator("#cardNumber");
    this.cardHolderNameInput = page.locator("#cardHolderName");
    this.expiryMonthSelector = page.locator("#month");
    this.expiryYearSelector = page.locator("#year");
    this.cvvInput = page.locator("#CVVNumber");
    this.payNowButton = page.locator("#credit_submit");
    this.invalidCardErrorMessage = page.locator("//span[text()='Invalid Card Number']");
  }

  async selectDebitCardAndEnterDetails(cardNumber, holderName, cvv) {
    await this.debitCardOption.click();
    await this.cardTypeSelector.click();
    await this.cardTypeSelector.selectOption("RUPAY");
    await this.cardNumberInput.fill(cardNumber);
    await this.cardHolderNameInput.fill(holderName);
    await this.expiryMonthSelector.selectOption("06");
    await this.expiryYearSelector.selectOption("2027");
    await this.cvvInput.fill(cvv);
  }

  async confirmPaymentSubmission() {
    await this.payNowButton.click();
  }

  async verifyInvalidCardNumberError() {
    try {
      await expect(this.invalidCardErrorMessage).toHaveText("Invalid Card Number");
      // await takeTimestampedScreenshot(this.page, "InvalidCard");
    } catch (error) {
      throw new Error(`Validation message missing or screenshot failed: ${error}`);
    }
  }
}

module.exports = PaymentPage;
