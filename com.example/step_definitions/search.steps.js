import MyStoreHomePage from '../page_objects/myStoreHomePage';
import { attachImageToCucumberReport, attachDataToCucumberReport } from '../utils/help';

const { Then } = require('cucumber');

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
  console.log(noSearchResultsText);
  assert.equal(noSearchResultsText, 'No results were found for your search "abc"');
  attachImageToCucumberReport();
});

Then(/^I should see results matching the search value$/, () => {
  MyStoreHomePage.searchLabel.waitForExist(1000);
  // MyStoreHomePage.searchLabel.scrollIntoView({block: 'end'});
  const searchResultsText = MyStoreHomePage.searchString.getText();
  console.log(searchResultsText);
  assert.equal(searchResultsText, '"T-SHIRT"');
  attachImageToCucumberReport();
});

Then(/^I click on the dresses link$/, () => {

});