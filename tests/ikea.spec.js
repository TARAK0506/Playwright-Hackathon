const { test } = require("@playwright/test");
const Homepage = require("../pages/HomePage");
const BookshelvesPage = require("../pages/BookShelvesPage");
const StudyPage = require("../pages/StudyChairPage");
const GiftcardPage = require("../pages/GiftCardPage");
const PaymentPage = require("../pages/PaymentsPage");

test("Complete IKEA automation flow", async ({ page }) => {
  const homepage = new Homepage(page);
  const booksPage = new BookshelvesPage(page);
  const giftcardPage = new GiftcardPage(page);
  const paymentPage = new PaymentPage(page);
  const studyPage = new StudyPage(page);

  // Homepage
  await homepage.goHome();
  await homepage.saveHomeCollections();

  
  // BookShelves Flow
  await homepage.performSearch("Book Shelves");
  await booksPage.pagination(2); 

  // Study Chair Flow
  await homepage.goHome();
  await homepage.performSearch("Study Chair");
  await studyPage.openAllFiltersPanel();
  await studyPage.openCustomerRatingFilter();
  await studyPage.applyFourStarRatingFilter();
  await studyPage.expandSearchResults();
  await studyPage.captureChairProductDetailsToCSV();

  // Gift Card Flow
  await homepage.goHome();
  await homepage.goToGiftCard();
  await giftcardPage.navigateToGiftCardPage();
  await giftcardPage.openGiftCardPurchaseSection();
  await giftcardPage.chooseGiftCardAmount(5000);
  await giftcardPage.fillRecipientDetails({
    firstName: "sai",
    lastName: "Gangu",
    email: "sai@gmail.com",
    confirmEmail: "sai@gmail.com",
    deliveryType: "someone"
  });
  await giftcardPage.fillSenderDetails({
    firstName: "vikash",
    lastName: "Bala",
    email: "vikash@gmail.com",
    confirmEmail: "vikash@gmail.com"
  });

  // Payment Flow
  await paymentPage.selectDebitCardAndEnterDetails("2345678937686576", "sai", "199");
  await paymentPage.confirmPaymentSubmission();
  await paymentPage.verifyInvalidCardNumberError();
});
