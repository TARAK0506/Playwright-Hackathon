const { test } = require("@playwright/test");
const Homepage  = require('../pages/HomePage');
const StudyPage  = require('../pages/StudyChairPage');

test.describe("@sanity Study Chair Filtering Flow", () => {
  let homepage;
  let studypage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    studypage = new StudyPage(page);
    await homepage.goHome();
    await homepage.getChair();
  });

  test("Should open All Filters panel", async () => {
    await studypage.openAllFiltersPanel();
  });

  test("Should apply customer rating filter", async () => {
    await studypage.openAllFiltersPanel();
    await studypage.openCustomerRatingFilter();
    await studypage.applyFourStarRatingFilter();
  });

  test("Should view filtered products", async () => {
    await studypage.openAllFiltersPanel();
    await studypage.openCustomerRatingFilter();
    await studypage.applyFourStarRatingFilter();
    await studypage.expandSearchResults();
  });

  test("Should save chair details into CSV", async () => {
    await studypage.openAllFiltersPanel();
    await studypage.openCustomerRatingFilter();
    await studypage.applyFourStarRatingFilter();
    await studypage.expandSearchResults();
    await studypage.captureChairProductDetailsToCSV();
  });
});