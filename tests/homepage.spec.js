const { test } = require('@playwright/test');
const Homepage  = require('../pages/HomePage');
const BookshelvesPage = require('../pages/BookShelvesPage');
const StudyChairPage = require('../pages/StudyChairPage');

const searchCriteria = {
  booksPage : "Book Shelves",
  studyPage : "Study Chair"
};

test.describe("@sanity Homepage & Search Flow", () => {
  let homepage, booksPage, studyPage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    booksPage = new BookshelvesPage(page);
    studyPage = new StudyChairPage(page);
    await homepage.goHome();
  });

  test("Should list homepage collections", async () => {
    await homepage.saveHomeCollections();
  });

  test("Should search for bookshelves", async () => {
    await homepage.findShelves();
  });

  test("Should extract bookshelf items into CSV", async () => {
    await homepage.findShelves();
    await booksPage.pagination(2);
  });
});