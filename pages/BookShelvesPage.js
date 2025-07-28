const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/BasePage');

class BookShelvesPage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
    }

    async performSearch(inputText) {
        await this.clickSearch();
        await this.fill(inputText);
        await this.submitSearch();
    }

    async waitForPage() {
        try {
            await this.productList.first().waitFor({ timeout: 15000 });
            return true;
        } catch (err) {
            console.warn("Search results not found: ", err.message);
            return false;
        }
    } 

    async hasShowMore() {
        try {
            const isVisible = await this.showMore.isVisible();
            const isDisabled = isVisible ? await this.showMore.isDisabled() : true;
            return isVisible && !isDisabled;
        } catch (err) {
            console.warn('Error checking for next button:', err.message);
            return false;
        }
    }


    async goToNextPage() {
        try {
            await Promise.all([
              this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
              this.showMore.click()
            ]);
            return true;
        } catch (err) {
            console.error("Error during navigation to next page:", err.message);
            return false;
        }
    }

    async getDetails() {
        const itemDetails = [];
        const productTitle = await this.productTitle.all();
        const productLink = await this.productLink.all();
        const productPrice = await this.productPrice.all();

        try {
          for (let i = 0; i < productTitle.length; i++) {
                const title = productTitle[i] ? await productTitle[i].textContent() : "No Product Title";
                const link = productLink[i] ? await productLink[i].getAttribute('href') : 'No Product Link';
                const price = productPrice[i] ? (await productPrice[i].innerText()).trim() : 'No price';
                itemDetails.push({ title, link, price });
          }
        } catch (err) {
          console.error('Error getting product details:', err.message);
        }
        return itemDetails;
    }


    async displayPageDetails(pageDetails){
      pageDetails.forEach(item => {
        console.log(`Title: ${item.title} | Link: ${item.link} | Price: ${item.price}`);
      });
    }

    async saveDataToFile(data, filename = 'results.json') {
        try {
          const outputPath = path.resolve(__dirname, `../data/${filename}`);
          fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
          console.log(`Data saved to ${outputPath}`);
          return true;
        } catch (err) {
          console.error(`Failed to save data: ${err.message}`);
          return false;
        }
    }



    async scrapeAllPages(maxPages = null) {
        let pageNum = 1;
        let allData = [];

        while (true) {
          if (this.page.isClosed()) {
            console.warn('Page is closed');
            break;
          }

          if (maxPages !== null && pageNum > maxPages) {
            console.log(`Max number of pages reached: ${pageNum - 1}`);
            break;
          }

          console.log(`\nScraping data from Page no : ${pageNum}...`);

          const hasLoaded = await this.waitForPage();
          if (!hasLoaded) {
            console.log('No results found.');
            break;
          }

          const pageDetails = await this.getDetails();

          // this.displayPageDetails(pageDetails);

          allData.push(...pageDetails);

          // Save the data after each page
          await this.saveDataToFile(allData);

          if (await this.hasShowMore()) {
            const hasNextPage = await this.goToNextPage();
            if (!hasNextPage) break;
          } else {
            break;
          }

          pageNum++;
        }

        console.log("Successfully scraped data from all the pages.");
        return allData;
    }

    async pagination(noOfPages) {
        return await this.scrapeAllPages(noOfPages);
    }
};   

module.exports = BookShelvesPage;













