import MyStoreHomePage from '../page_objects/myStoreHomePage';
import SignInPage from '../page_objects/signInPage';
import MyAccountPage from '../page_objects/myAccountPage';
import Constants from "../constants/configConstants";
import { attachImageToCucumberReport, attachDataToCucumberReport} from '../utils/help';

const { Given, When, Then } = require('cucumber');

let title;

Given(/^I navigate to the home page$/, () => {
  MyStoreHomePage.open();
  browser.waitUntil(
    () => (browser.getUrl().includes('automationpractice.com/')), Constants.WAIT_CONSTANT_5_SECS,
    `timeout waiting for page to load:: ${browser.getUrl()}`
  );
  title = browser.getTitle();
  assert.strictEqual(title, 'My Store', `Page Title mismatch, actual title is:: ${title}`);
});

Then(/^I click on Sign In Link$/, () => {
  SignInPage.signInLink.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  SignInPage.signInLink.click();
});

Then(/^I enter the "([^"]*)" and "([^"]*)"$/, (email, password) => {
  SignInPage.signIn(email, password);
});

Then(/^I should login successfully$/, () => {
  MyAccountPage.myHeading.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  const heading = MyAccountPage.myHeading.getText();
  assert.equal(heading, "MY ACCOUNT");
  attachImageToCucumberReport();
  title = browser.getTitle();
  assert.strictEqual(title, 'My account - My Store', `Page Title mismatch, actual title is:: ${title}`);
});
