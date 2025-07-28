const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const GiftCardPage = require('../pages/GiftCardPage');

test.describe("@smoke IKEA Gift Card Purchase Flow", () => {
  let homepage;
  let giftcard;
  const deliveryType = {
    someOne : "someone",
    forMyself : "myself"
  };

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    giftcard = new GiftCardPage(page);

    await homepage.goHome(); 
    await giftcard.navigateToGiftCardPage(); 
    await giftcard.openGiftCardPurchaseSection(); 
  });

  test("Should select gift card amount", async ({page}) => {
    await giftcard.chooseGiftCardAmount(5000);
  });

  test("Should fill recipient details", async ({page}) => {
    await giftcard.chooseGiftCardAmount(5000);
    await giftcard.fillRecipientDetails({
      firstName: "Sai",
      lastName: "Gangu",
      email: "sai@gmail.com",
      confirmEmail: "sai@gmail.com",
      deliveryType: "myself", 
    });
  });

  test("Should fill sender details", async ({page}) => {
    await giftcard.chooseGiftCardAmount(5000);
    await giftcard.fillRecipientDetails({
      firstName: "Sai",
      lastName: "Gangu",
      email: "sai@gmail.com",
      confirmEmail: "sai@gmail.com",
      deliveryType: "myself",
    });
    await giftcard.fillSenderDetails({
      firstName: "Tarak",
      lastName: "Ramarao",
      email: "tarakaramarao0506@gmail.com",
      confirmEmail: "tarakaramarao0506@gmail.com",
    });

    await page.close();
  });

  test("Should complete gift card purchase flow", async ({page}) => {
    await giftcard.chooseGiftCardAmount(5000);
    await giftcard.fillRecipientDetails({
      firstName: "Sai",
      lastName: "Gangu",
      email: "sai@gmail.com",
      confirmEmail: "sai@gmail.com",
      deliveryType: "someone",
    });
    await giftcard.fillSenderDetails({
      firstName: "Tarak",
      lastName: "Ramarao",
      email: "tarakaramarao0506@gmail.com",
      confirmEmail: "@tarakaramarao0506@gmail.com",
    }); 

    await page.close();
  });
});
