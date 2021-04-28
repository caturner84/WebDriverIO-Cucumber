import {
  attachDataToCucumberReport, attachImageToCucumberReport, pageObjects, waitConstants,
} from 'cbp-test-common-utils';

const { When, Then } = require('cucumber');

let paymentReference;

When(/^I click on create payment menu item$/, () => {
  pageObjects.AxpCrossBorderDashboard.createAPaymentButton.click();
});

Then(/^I should navigate to create payment page using pin "([^"]*)"$/, (pinOrPassword) => {
  browser.pause(8000);
  browser.waitUntil(
    () => (browser.getUrl().includes('/create-payment') || browser.getUrl().includes('authenticate?accountKey')),
    waitConstants.WAIT_TIME_60_SECS,
    `Time out to navigate to next page after user clicks on myca login button, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes('authenticate?accountKey')) {
    pageObjects.MycaLoginPage.completeAuthNFlow(pinOrPassword);
  }
  pageObjects.AxpCrossBorderCreatePayment.createAPaymentTitle.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.isTrue(pageObjects.AxpCrossBorderCreatePayment.createAPaymentTitle.isExisting(), 'Create payment page is not rendered');
});

When(/^I select the recipient "([^"]*)"$/, (recipientName) => {
  pageObjects.AxpCrossBorderRecipientSearch.selectRecipient(recipientName);
});

Then(/^Pricing module should be rendered$/, () => {
  pageObjects.AxpCrossBorderPricing.requestReadOnlyFundingAmount.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.isTrue(pageObjects.AxpCrossBorderPricing.requestReadOnlyFundingAmount.isExisting(), 'Pricing module is not'
    + ' rendered');
});

When(/^I select funding account$/, () => {
  pageObjects.AxpCrossBorderFundingMethodSelection.selectFundingAccount();
});

When(/^I enter the quote request details as below to generate a quote$/, (dataTable) => {
  const { fundingAmount, paymentAmount } = dataTable.hashes()[0];
  pageObjects.AxpCrossBorderPricing.enterQuoteData(fundingAmount, paymentAmount);
  attachDataToCucumberReport(dataTable.hashes()[0]);
});

Then(/^I should get the successful quote summary/, () => {
  pageObjects.AxpCrossBorderPricing.summaryPaymentAmountLabel.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  attachImageToCucumberReport();
});

Then(/^Payment module should be rendered$/, () => {
  assert.isTrue(pageObjects.AxpCrossBorderCreatePayment.recipientNotesInput.isExisting(),
    'Payment module is not rendered');
});

When(/^I enter "([^"]*)" and "([^"]*)"$/, (paymentNotes, customerNotes) => {
  pageObjects.AxpCrossBorderCreatePayment.recipientNotesInput.scrollIntoView({ block: 'center' });
  pageObjects.AxpCrossBorderCreatePayment.recipientNotesInput.setValue(paymentNotes);
  pageObjects.AxpCrossBorderCreatePayment.customerNotesInput.setValue(customerNotes);
  attachImageToCucumberReport();
});

When(/^I click on accept payment button$/, () => {
  pageObjects.AxpCrossBorderCreatePayment.acceptPaymentButton.scrollIntoView({ block: 'center' });
  attachImageToCucumberReport();
  pageObjects.AxpCrossBorderCreatePayment.acceptPaymentButton.click();
});

Then(/^I should navigate to payment confirmation page$/, () => {
  pageObjects.AxpCrossBorderCreatePayment.createAnotherPaymentButton.scrollIntoView({ block: 'end' });
  pageObjects.AxpCrossBorderCreatePayment.createAnotherPaymentButton.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  paymentReference = pageObjects.AxpCrossBorderCreatePayment.paymentReference.getText();
  module.exports.paymentRef = pageObjects.AxpCrossBorderCreatePayment.paymentReference.getText();
  attachImageToCucumberReport();
});

When(/^I navigate to the payment history page$/, () => {
  pageObjects.AxpCrossBorderCreatePayment.viewPaymentHistoryButton.click();
});

When(/^I click to expand a payment$/, () => {
  pageObjects.AxpCrossBorderPaymentHistory.clickOnPaymentRow(paymentReference);
});

When(/^I should see a summary of the payment details on payment history$/, () => {
  pageObjects.AxpCrossBorderPaymentHistory.waitForPaymentReferenceNumber(paymentReference);
  attachImageToCucumberReport();
});

When(/^I click on see payment details for the selected payment on payment history$/, () => {
  pageObjects.AxpCrossBorderPaymentHistory.clickOnSeePaymentDetailsLink(paymentReference);
});

Then(/^I can view the payment details$/, () => {
  pageObjects.AxpCrossBorderPaymentDetails.paymentSummarySection.waitForExist(waitConstants.WAIT_TIME_10_SECS);
  attachImageToCucumberReport();
});

Then(/^I should see a payment status as "([^"]*)"$/, (paymentStatus) => {
  pageObjects.AxpCrossBorderServicingPaymentDetails.waitForPaymentDetailsHeader();
  assert.strictEqual(paymentStatus, pageObjects.AxpCrossBorderServicingPaymentDetails.getPaymentStatus(), 'payment status mismatch');
  attachImageToCucumberReport();
});

Then(/^I should be landing on error page$/, () => {
  pageObjects.AxpCrossBorderRoot.existInvalidErrorText.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.isTrue(pageObjects.AxpCrossBorderRoot.existInvalidErrorText.isExisting(),
    'Correct error page is not rendered');
  attachImageToCucumberReport();
});
