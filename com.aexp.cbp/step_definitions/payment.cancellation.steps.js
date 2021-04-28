import { attachImageToCucumberReport, pageObjects, waitConstants } from 'cbp-test-common-utils';

const { When, Then } = require('cucumber');
const paymentRef = require('./create.payment.steps');


When(/^I click on payment listing button$/, () => {
  pageObjects.AxpCrossBorderServicingHub.viewPaymentListingButton.click();
  attachImageToCucumberReport();
});

Then(/^I should navigate to payment listing page$/, () => {
  pageObjects.AxpCrossBorderPaymentListing.paymentsTable.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

Then(/^I search for the payment$/, () => {
  pageObjects.AxpCrossBorderPaymentListing.paymentSearchInput.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.AxpCrossBorderPaymentListing.paymentSearchInput.setValue(paymentRef.paymentRef);
  pageObjects.AxpCrossBorderPaymentListing.paymentSearchAndClear.click();
});

Then(/^I select a payment by clicking on payment reference from list$/, () => {
  pageObjects.AxpCrossBorderPaymentListing.waitForPaymentReferenceNumber(paymentRef.paymentRef);
  attachImageToCucumberReport();
  pageObjects.AxpCrossBorderPaymentListing.clickOnPaymentReference(paymentRef.paymentRef);
});

When(/^I click on cancel payment button$/, () => {
  pageObjects.AxpCrossBorderServicingPaymentDetails.cancelButton.waitForClickable(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.AxpCrossBorderServicingPaymentDetails.cancelButton.click();
});

Then(/^Select a reason for cancellation "([^"]*)"$/, (reasonForCancellation) => {
  pageObjects.AxpCrossBorderServicingPaymentDetails.selectReasonForCancellation(reasonForCancellation);
});

Then(/^I click on submit cancel payment button$/, () => {
  pageObjects.AxpCrossBorderServicingPaymentDetails.submitCancelButton.waitForClickable(waitConstants.WAIT_TIME_5_SECS);
  pageObjects.AxpCrossBorderServicingPaymentDetails.submitCancelButton.scrollIntoView({ block: 'center' });
  pageObjects.AxpCrossBorderServicingPaymentDetails.submitCancelButton.click();
});

Then(/^I should see "([^"]*)" message and status as "([^"]*)"$/, (cancellationMessage, expPaymentStatus) => {
  pageObjects.AxpCrossBorderServicingPaymentDetails.getCancellationMessage(cancellationMessage).waitForExist(waitConstants.WAIT_TIME_60_SECS);
  assert.strictEqual(expPaymentStatus, pageObjects.AxpCrossBorderServicingPaymentDetails.getPaymentStatus(), 'payment status mismatch');
  attachImageToCucumberReport();
});

Then(/^Position covered and Sanction cleared events should be received$/, () => {
  const positionCoveredStatus = pageObjects.AxpCrossBorderServicingPaymentDetails.getEventStatus('PositionCovered');
  assert.isTrue(positionCoveredStatus, 'Position covered event has not been received');
  const sanctionsClearedStatus = pageObjects.AxpCrossBorderServicingPaymentDetails.getEventStatus('SanctionsCleared');
  assert.isTrue(sanctionsClearedStatus, 'Sanctions cleared event has not been received');
});
