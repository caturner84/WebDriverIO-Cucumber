import MyAccountPage from '../page_objects/myAccountPage';
import Constants from "../constants/configConstants";
import MyAddressesPage from "../page_objects/myAddressPage";
import { attachImageToCucumberReport } from '../utils/help';

const { Given, When } = require('cucumber');

let heading;

Given(/^I click on my personal information$/, () => {
  MyAccountPage.myPersonalInfoButton.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.myPersonalInfoButton.click();
  attachImageToCucumberReport();
});

When(/^I update the first name as "([^"]*)"$/, (firstName) => {
  MyAccountPage.firstName.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.firstName.setValue(firstName);
});

When(/^I update the current password "([^"]*)" and new password "([^"]*)"$/, (oldPassword, newPassword) => {
  MyAccountPage.oldPassword.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.oldPassword.setValue(oldPassword);
  MyAccountPage.newPassword.setValue(newPassword);
  MyAccountPage.confirmPassword.setValue(newPassword);
});

When(/^I click save button$/, () => {
  MyAccountPage.saveButton.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.saveButton.click();
});

When(/^The update should be successful$/, () => {
  MyAccountPage.updateMessage.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.updateMessage.click();
  attachImageToCucumberReport();
});

Given(/^I click on my addresses$/, () => {
  MyAccountPage.myAddressesButton.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAccountPage.myAddressesButton.click();
  MyAccountPage.myHeading.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  heading = MyAccountPage.myHeading.getText();
  assert.equal(heading, "MY ADDRESSES");
  attachImageToCucumberReport();
});

Given(/^I click on update button$/, () => {
  MyAddressesPage.updateButton.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAddressesPage.updateButton.click();
  attachImageToCucumberReport();
});

When(/^I update the city as "([^"]*)"$/, (city) => {
  MyAddressesPage.cityInput.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  MyAddressesPage.cityInput.setValue(city);
});

When(/^The address should be updated$/, () => {
  MyAccountPage.myHeading.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  heading = MyAccountPage.myHeading.getText();
  assert.equal(heading, "MY ADDRESSES");
});
