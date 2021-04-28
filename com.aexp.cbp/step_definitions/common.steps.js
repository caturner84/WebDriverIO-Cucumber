import {
  pageObjects, waitConstants, attachImageToCucumberReport,
} from 'cbp-test-common-utils';

const { Given, When, Then } = require('cucumber');

Given(/^I launch the myca login page$/, () => {
  pageObjects.LaunchApplication.launchMycaLoginPage('');
  pageObjects.MycaLoginPage.userNameInput.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I login to myca using username "([^"]*)" and password "([^"]*)" using pin "([^"]*)"$/, (userName, password, pinOrPassword) => {
  pageObjects.MycaLoginPage.login(userName, password);
  browser.waitUntil(
    () => (browser.getUrl().includes('/home') || browser.getUrl().includes('two-step-verification')),
    waitConstants.WAIT_TIME_60_SECS,
    `Time out to navigate to next page after user clicks on myca login button, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes('two-step-verification')) {
    pageObjects.MycaLoginPage.completeAuthNFlowLogin(pinOrPassword);
  }
});

Then(/^I should navigate to home page$/, () => {
  pageObjects.AxpCrossBorderNavigation.recipientsLink.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.isTrue(pageObjects.AxpCrossBorderNavigation.recipientsLink.isExisting(), 'home page is not rendered');
  attachImageToCucumberReport();
});

Given(/^I launch the servicing portal login page using "([^"]*)" with "([^"]*)" and "([^"]*)"$/, (environment, userName, password) => {
  pageObjects.LaunchApplication.launchServicingLoginPage(environment, userName, password);
  pageObjects.ServicingLoginPage.userNameInput.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I login to servicing portal using username "([^"]*)" and password "([^"]*)"$/, (userName, password) => {
  pageObjects.ServicingLoginPage.login(userName, password);
});

Then(/^I should navigate to hub page$/, () => {
  pageObjects.AxpCrossBorderServicingHub.viewPaymentListingButton.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.isTrue(pageObjects.AxpCrossBorderServicingHub.viewPaymentListingButton.isExisting(), 'hub page is not rendered');
});
