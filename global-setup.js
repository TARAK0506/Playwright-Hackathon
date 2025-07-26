const { chromium } = require('@playwright/test');
import fs from 'fs';
import path from 'path';

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await browser.newPage();
  await page.goto('https://www.ikea.com/in/en/', { waitUntil: 'domcontentloaded' });
  
  const authPath = path.resolve(__dirname, '.auth');
  if (!fs.existsSync(authPath)) {
    fs.mkdirSync(authPath);
  }

  await context.storageState({ path: path.join(authPath, 'state.json') });
  await browser.close();
};
