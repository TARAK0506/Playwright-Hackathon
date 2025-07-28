import {test,expect} from '@playwright/test';
const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/BasePage');
const Homepage = require('../pages/HomePage');
const BookShelvesPage = require('../pages/BookShelvesPage');
const StudyChairPage = require('../pages/StudyChairPage');
const GiftcardPage = require('../pages/GiftcardPage');
const PaymentPage = require('../pages/PaymentsPage');
const csvWriter = require('../utils/csvWriter');

// Configure baseURL for this file.
// test.use({ baseURL: 'https://www.ikea.com/in/en/' });

let results = [];

test.describe('IKEA Advanced Search test', () => {

    let basePage, homePage, booksShelvesPage, studyChairPage, giftCardPage, paymentPage;  

    const searchCriteria = {
        BookSheleves : "Book Shelves",
        StudyChair : "Study Chair"
    };

    test.beforeEach(async({page}) =>{
        // define all pages here
        basePage = new BasePage(page);
        homePage = new Homepage(page);
        booksShelvesPage = new BookShelvesPage(page);
        studyChairPage = new StudyChairPage(page);
        giftCardPage = new GiftcardPage(page);
        paymentPage = new PaymentPage(page);

    });


    test("Navigate to Website", async({page}) => {

        const noOfPages = 4;

        // Navigate to URL
        await page.goto('https://www.ikea.com/in/en/', { waitUntil: 'domcontentloaded' });

        // Assertions 
        await expect(page).toHaveTitle(/IKEA/);
        await expect(page).toHaveURL('https://www.ikea.com/in/en/');


        await booksShelvesPage.clickSearch();
        await booksShelvesPage.fill("Book Shelves");
        await booksShelvesPage.submitSearch();
        // results = await booksShelvesPage.scrapeAllPages(); 


        results = await booksShelvesPage.pagination(noOfPages);
        console.log(results.length);

        //Assertion
        // expect(results.length).toBeGreaterThan(0);
    });

    test.afterAll(() => {
        if (results.length > 0) {
          const csvData = csvWriter(results);
        
          const csvPath = path.resolve(__dirname, '../data/ikea_bookshelvespage.csv');
          const dir = path.dirname(csvPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
      
          fs.writeFileSync(csvPath, csvData);
          console.log(`CSV file saved to ${csvPath}`);
        } else {
          console.log('No data scraped, CSV not saved.');
        }
    });

    console.log("All tests Completed Successfully!");
});













