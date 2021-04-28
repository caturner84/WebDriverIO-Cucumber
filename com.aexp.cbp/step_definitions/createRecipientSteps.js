import {
  pageObjects, waitConstants, attachImageToCucumberReport,
} from 'cbp-test-common-utils';

const { When, Then } = require('cucumber');

When(/^I click on Add a New Recipient$/, () => {
  pageObjects.AxpCrossBorderCreatePayment.recipientAddNewLink.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  pageObjects.AxpCrossBorderCreatePayment.recipientAddNewLink.click();
});

Then(/^I should navigate to the Create Recipient page$/, () => {
  pageObjects.AxpCrossBorderRecipient.recipientAddLabel.waitForExist(waitConstants.WAIT_TIME_10_SECS);
});

When(/^I fill in the form and create a recipient "([^"]*)"$/, (recipientName) => {
  pageObjects.AxpCrossBorderRecipient.bankCOuntry.selectByAttribute('value', 'GB');
  pageObjects.AxpCrossBorderRecipient.currency.selectByAttribute('value', 'GBP');
  pageObjects.AxpCrossBorderRecipient.ibanField.setValue('GB33BUKB20201555555555');
  pageObjects.AxpCrossBorderRecipient.nameField.setValue(recipientName);
  pageObjects.AxpCrossBorderRecipient.nicknameField.setValue('Endy');
  pageObjects.AxpCrossBorderRecipient.addressCountry.selectByAttribute('value', 'GB');
  pageObjects.AxpCrossBorderRecipient.addressSearch.scrollIntoView({ block: 'center' });
  browser.pause(1000);
  pageObjects.AxpCrossBorderRecipient.manualEntryButton.click();
  pageObjects.AxpCrossBorderRecipient.addressLine1.setValue('123 EndToEnd Street');
  pageObjects.AxpCrossBorderRecipient.city.setValue('Burgess Hill');
  pageObjects.AxpCrossBorderRecipient.postcode.setValue('RH15 9AQ');
  pageObjects.AxpCrossBorderRecipient.cancelRecipientButton.scrollIntoView({ block: 'center' });
  browser.pause(1000);
  attachImageToCucumberReport();
  pageObjects.AxpCrossBorderRecipient.saveRecipientButton.click();
});

Then(/^The recipient search dropdown will be populated with "([^"]*)"$/, (recipientName) => {
  pageObjects.AxpCrossBorderFundingMethodSelection.fundingAccountDropDown.waitForExist();
  const actualRecipientName = pageObjects.AxpCrossBorderRecipientSearch.getSelectedRecipientName(recipientName);
  assert.include(actualRecipientName, recipientName, 'Recipient Name is not matched');
  attachImageToCucumberReport();
});

Then(/^I can delete the recipient "([^"]*)"$/, (recipientName) => {
  const firstOption = `//a[text()='${recipientName}'][1]`;
  pageObjects.AxpCrossBorderNavigation.homeLink.scrollIntoView({ block: 'center' });
  pageObjects.AxpCrossBorderNavigation.homeLink.click();
  pageObjects.AxpCrossBorderNavigation.recipientsLink.waitForExist(waitConstants.WAIT_TIME_30_SECS);
  pageObjects.AxpCrossBorderNavigation.recipientsLink.click();
  pageObjects.AxpCrossBorderRecipient.recipientSearchInputField.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  pageObjects.AxpCrossBorderRecipient.recipientSearchInputField.setValue(recipientName);
  $(firstOption).waitForExist(waitConstants.WAIT_TIME_60_SECS);
  $(firstOption).click();
  pageObjects.AxpCrossBorderRecipient.deleteRecipientButton.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  pageObjects.AxpCrossBorderRecipient.deleteRecipientButton.waitForClickable(waitConstants.WAIT_TIME_30_SECS);
  pageObjects.AxpCrossBorderRecipient.deleteRecipientButton.click();
  pageObjects.AxpCrossBorderRecipient.confirmDeleteRecipientButton.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  pageObjects.AxpCrossBorderRecipient.confirmDeleteRecipientButton.click();
  pageObjects.AxpCrossBorderRecipient.recipientSearchInputField.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  attachImageToCucumberReport();
});
