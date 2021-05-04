import MyStoreHomePage from '../page_objects/myStoreHomePage';
import SearchResultsPage from '../page_objects/searchResultsPage';
import CartSummaryPage from "../page_objects/cartSummaryPage";
import OrderHistoryPage from "../page_objects/orderHistoryPage";
import Constants from "../constants/configConstants";
import { attachImageToCucumberReport, attachDataToCucumberReport } from '../utils/help';

const { Then } = require('cucumber');

let heading;

Then(/^I search for a product using "([^"]*)" and the search button$/, (searchValue) => {
  MyStoreHomePage.search(searchValue);
  attachDataToCucumberReport();
});

Then(/^I search for a product using "([^"]*)" and the dropdown$/, (searchValue) => {
  MyStoreHomePage.searchAndSelect(searchValue);
  attachDataToCucumberReport();
});

Then(/^I should see a message showing there are no results$/, () => {
  const noSearchResultsText = MyStoreHomePage.noSearchResult.getText();
  assert.equal(noSearchResultsText, 'No results were found for your search "abc"');
  attachImageToCucumberReport();
});

Then(/^I should navigate to the search results page$/, () => {
  MyStoreHomePage.searchLabel.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  const searchResultsText = MyStoreHomePage.searchString.getText();
  assert.equal(searchResultsText, '"T-SHIRT"');
  attachImageToCucumberReport();
});

Then(/^I click on the dresses link$/, () => {

});

Then(/^I add the product to cart$/, () => {
  SearchResultsPage.product.moveTo();
  SearchResultsPage.addToCart.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  // SearchResultsPage.addToCart.scrollIntoView({block: "nearest"});
  SearchResultsPage.addToCart.click();
  attachImageToCucumberReport();
});

Then(/^I click on proceed to check out$/, () => {
  SearchResultsPage.proceedToCheckout.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  // SearchResultsPage.proceedToCheckout.scrollIntoView({block: "nearest"});
  SearchResultsPage.proceedToCheckout.click();
  attachImageToCucumberReport();
});

Then(/^I should navigate to the cart summary page$/, () => {
  CartSummaryPage.shoppingCartHeading.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  heading = CartSummaryPage.shoppingCartHeading.getText();
  assert.equal(heading, "SHOPPING-CART SUMMARY\nYour shopping cart contains: 1 Product");
  attachImageToCucumberReport();
});

Then(/^I proceed to checkout the product$/, () => {
  CartSummaryPage.proceedToCheckout.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  CartSummaryPage.proceedToCheckout.click();
  CartSummaryPage.proceedToCheckout.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  CartSummaryPage.proceedToCheckout.click();
  CartSummaryPage.paymentOptionWire.click();
  CartSummaryPage.termsOfServiceCheckbox.waitForExist(Constants.WAIT_CONSTANT_30_SECS);
  CartSummaryPage.termsOfServiceCheckbox.click();
  attachImageToCucumberReport();
});

Then(/^I should be able to order the product successfully$/, () => {
  CartSummaryPage.shoppingCartHeading.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  heading = CartSummaryPage.shoppingCartHeading.getText();
  assert.equal(heading, "PLEASE CHOOSE YOUR PAYMENT METHOD");
  attachImageToCucumberReport();
  CartSummaryPage.confirmOrder.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  CartSummaryPage.confirmOrder.click();
});

Then(/^I click on back to orders$/, () => {
  CartSummaryPage.backToOrders.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  CartSummaryPage.backToOrders.click();
});

Then(/^The order history should be displayed$/, () => {
  OrderHistoryPage.orderHistoryHeading.waitForExist(Constants.WAIT_CONSTANT_5_SECS);
  heading = OrderHistoryPage.orderHistoryHeading.getText();
  assert.equal(heading, "PLEASE CHOOSE YOUR PAYMENT METHOD");
  attachImageToCucumberReport();
});
