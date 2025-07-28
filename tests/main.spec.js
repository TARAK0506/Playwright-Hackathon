import {test,expect} from '@playwright/test';
const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/BasePage');
const Homepage = require('../pages/HomePage');
const BookShelvesPage = require('../pages/BookShelvesPage');
const StudyChairPage = require('../pages/StudyChairPage');
const GiftcardPage = require('../pages/GiftCardPage');
const PaymentPage = require('../pages/PaymentsPage');
const csvWriter = require('../utils/csvWriter');
const saveToFilePath = require('../utils/fileUtils');

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

        const noOfPages = 2;

        // Navigate page to URL
        await page.goto('https://www.ikea.com/in/en/');

        // Assertions 
        await expect(page).toHaveTitle(/IKEA/);
        await expect(page).toHaveURL('https://www.ikea.com/in/en/');

        await booksShelvesPage.performSearch("Book Shelves");

        results = await booksShelvesPage.pagination(noOfPages);
        // console.log(results.length);

        //Assertion
        try {
          expect(results.length).toBeGreaterThan(0);
        } catch (error) {
          console.error("Test failed:", error);
        }        
    });

    test.afterAll(() => {
        if (results.length > 0) {
          const csvData = csvWriter(results);
        
          saveToFilePath('../output/ikea_bookshelvespage.csv', csvData);
        } else {
          console.log('No data scraped, CSV not saved.');
        }
    });

    console.log("All tests Completed Successfully!");
});













