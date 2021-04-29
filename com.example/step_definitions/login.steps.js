import MyStoreHomePage from '../page_objects/myStoreHomePage';
import { attachImageToCucumberReport, attachDataToCucumberReport } from '../utils/help';

const { Given, When, Then } = require('cucumber');

let title;

Given(/^I navigate to the home page$/, () => {
  MyStoreHomePage.open();
  browser.waitUntil(
    () => (browser.getUrl().includes('automationpractice.com/')), 6000,
    `timeout waiting for page to load:: ${browser.getUrl()}`
  );
});

When(/^I get the page title$/, () => {
  title = browser.getTitle();
  console.log(title);
});

Then(/^The page title should be matched$/, () => {
  assert.strictEqual(title, 'My Store');
});
