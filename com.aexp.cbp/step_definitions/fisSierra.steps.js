import {
  pageObjects, waitConstants, attachImageToCucumberReport,
} from 'cbp-test-common-utils';

const { Given, When } = require('cucumber');

let actualNumberOfCurrencyPairsCount;
let actualNumberOfCurrenciesCount;
let actualNumberOfCurrencyGroupsCount;
let actualNumberOfCurrencyPairGroupsCount;
let actualNumberOfCfeTypeDefinitionsCount;
let actualNumberOfEntityDefinitionsCount;
let actualNumberOfSettlementInstructionsCount;
let actualNumberOfPurposeCodeCount;
let actualNumberOfBookDefinitionCount;
let actualNumberOfDeskCount;
let actualNumberOfAccountingEntrySetupCount;
let actualNumberOfAccountNumberMappingCount;
const e0 = 'dev.avantgardportal';
const e1 = 'test.avantgardportal';
const e2 = 'pp.avantgardportal';

Given(/^I launch the sierra login page$/, () => {
  pageObjects.LaunchApplication.launchMycaLoginPage('');
});

When(/^I login to sierra using username and password$/, (dataTable) => {
  browser.pause(4000);
  const { userName, password } = dataTable.hashes()[0];
  browser.waitUntil(
    () => (browser.getUrl().includes('https://ssoi-dev.americanexpress.com/') || browser.getUrl().includes('avantgardportal') || browser.getUrl().includes('americanexpresspreview_sierra_1')),
    waitConstants.WAIT_TIME_60_SECS,
    `Time out to navigating to login, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes('https://ssoi-dev.americanexpress.com')) {
    pageObjects.SierraLoginPage.login(userName, password);
  } else if (browser.getUrl().includes('americanexpresspreview_sierra_1')) {
    pageObjects.SierraLoginPage.userNameInput.waitForExist(waitConstants.WAIT_TIME_60_SECS);
    pageObjects.SierraLoginPage.loginSinglePage(userName, password);
  }
});

Given(/^I should navigate to sierra home page$/, () => {
  pageObjects.SierraHomePage.fisLogo.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

Given(/^I click on currencies menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.currencies.click();
  pageObjects.SierraCurrencyPage.currencyTab.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of currencies "([^"]*)"$/, (noOfCurrencies) => {
  browser.pause(2000);
  pageObjects.SierraCurrencyPage.currencyTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfCurrencies = pageObjects.SierraCurrencyPage.currencyTableRow;
  actualNumberOfCurrenciesCount = actualNumberOfCurrencies.length;
  assert.equal(actualNumberOfCurrenciesCount, noOfCurrencies, 'Number of currencies in the currencies table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available currencies$/, () => {
  for (let i = 1; i <= actualNumberOfCurrenciesCount; i++) {
    const currenciesRowData = pageObjects.SierraCurrencyPage.getCurrenciesData(i);
    if (currenciesRowData.includes('AUD')) {
      assert.strictEqual('AUD Australian Dollar 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('CAD')) {
      assert.strictEqual('CAD Canadian Dollar 365 1 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('CHF')) {
      assert.strictEqual('CHF Switzerland Franc 360 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('EUR')) {
      assert.strictEqual('EUR Euro Member Countries 360 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('GBP')) {
      assert.strictEqual('GBP United Kingdom Pound 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('HKD')) {
      assert.strictEqual('HKD Hong Kong Dollar 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('JPY')) {
      assert.strictEqual('JPY Japanese Yen 365 2 0 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('MXN')) {
      assert.strictEqual('MXN Mexican Peso 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('NZD')) {
      assert.strictEqual('NZD New Zealand Dollar 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('SGD')) {
      assert.strictEqual('SGD Singapore Dollar 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('USD')) {
      assert.strictEqual('USD United States Dollar 360 2 2 Round 0.0 No Sun/Sat Ignore For Spot Date Missing',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currenciesRowData.includes('ZAR')) {
      assert.strictEqual('ZAR South African Rand 365 2 2 Round 0.0 No Sun/Sat Include For Spot Date Defined',
        currenciesRowData, `Currencies data mismatch, check row ${i} with fis and update accordingly`);
    } else {
      console.error('Currency data not found');
    }
  }
});

Given(/^I click on currency pairs menu item$/, () => {
  pageObjects.SierraCurrencyPage.currencyPairs.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyPairs.click();
  pageObjects.SierraCurrencyPage.currencyPairsHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of currency pairs "([^"]*)"$/, (noOfCurrencyPairs) => {
  browser.pause(2000);
  pageObjects.SierraCurrencyPage.currencyPairsTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfCurrencyPairs = pageObjects.SierraCurrencyPage.currencyPairsTableRow;
  actualNumberOfCurrencyPairsCount = actualNumberOfCurrencyPairs.length;
  assert.equal(actualNumberOfCurrencyPairsCount, noOfCurrencyPairs, 'Number of currency pairs in the currency pairs table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available currency pairs$/, () => {
  browser.waitUntil(
    () => (browser.getUrl().includes(e0) || browser.getUrl().includes(e1) || browser.getUrl().includes(e2)),
    waitConstants.WAIT_TIME_10_SECS,
    `Time out to determining environment, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes(e0)) {
    validateCurrencyPairsE0();
  } else if (browser.getUrl().includes(e1)) {
    validateCurrencyPairsE1E2();
  } else if (browser.getUrl().includes(e2)) {
    validateCurrencyPairsE1E2();
  }
});

Given(/^I click on currency group menu item$/, () => {
  pageObjects.SierraCurrencyPage.currencyGroup.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyGroup.click();
  pageObjects.SierraCurrencyPage.currencyGroupLabel.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see all options in currency group name dropdown$/, () => {
  pageObjects.SierraCurrencyPage.currencyGroupDropdown.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyGroupDropdown.click();
  const options = pageObjects.SierraCurrencyPage.currencyDropdownOptions.getText();
  assert.strictEqual('ALL', options, 'Currency group name dropdown mismatch');
});

When(/^I should see the correct number of currency groups "([^"]*)"$/, (noOfCurrencyGroups) => {
  browser.pause(2000);
  pageObjects.SierraCurrencyPage.currencyGroupTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfCurrencyGroups = pageObjects.SierraCurrencyPage.currencyGroupTableRow;
  actualNumberOfCurrencyGroupsCount = actualNumberOfCurrencyGroups.length;
  assert.equal(actualNumberOfCurrencyGroupsCount, noOfCurrencyGroups, 'Number of currency groups in the currency groups table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available currency groups$/, () => {
  for (let i = 1; i <= actualNumberOfCurrencyGroupsCount; i++) {
    const currencyGroupsRowData = pageObjects.SierraCurrencyPage.getCurrencyGroupsData(i);
    if (currencyGroupsRowData.includes('AUD')) {
      assert.strictEqual('AUD Australian Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('CAD')) {
      assert.strictEqual('CAD Canadian Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('CHF')) {
      assert.strictEqual('CHF Switzerland Franc',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('EUR')) {
      assert.strictEqual('EUR Euro Member Countries',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('GBP')) {
      assert.strictEqual('GBP United Kingdom Pound',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('HKD')) {
      assert.strictEqual('HKD Hong Kong Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('JPY')) {
      assert.strictEqual('JPY Japanese Yen',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('MXN')) {
      assert.strictEqual('MXN Mexican Peso',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('NZD')) {
      assert.strictEqual('NZD New Zealand Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('SGD')) {
      assert.strictEqual('SGD Singapore Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD')) {
      assert.strictEqual('USD United States Dollar',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('ZAR')) {
      assert.strictEqual('ZAR South African Rand',
        currencyGroupsRowData, `Currency groups data mismatch, check row ${i} with fis and update accordingly`);
    } else {
      console.error('Currency groups data not found');
    }
  }
});

Given(/^I click on currency pair groups menu item$/, () => {
  pageObjects.SierraCurrencyPage.currencyPairsGroup.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyPairsGroup.click();
  pageObjects.SierraCurrencyPage.currencyPairsGroupLabel.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see all options in currency pair groups name dropdown$/, () => {
  pageObjects.SierraCurrencyPage.currencyPairGroupsDropdown.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyPairGroupsDropdown.click();
  const options = pageObjects.SierraCurrencyPage.currencyDropdownOptions.getText();
  assert.strictEqual('ALL', options, 'Currency pair groups name dropdown mismatch');
});

When(/^I should see the correct number of pair groups "([^"]*)"$/, (noOfCurrencyPairGroups) => {
  browser.pause(2000);
  pageObjects.SierraCurrencyPage.currencyPairGroupsTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfCurrencyPairGroups = pageObjects.SierraCurrencyPage.currencyPairGroupsTableRow;
  actualNumberOfCurrencyPairGroupsCount = actualNumberOfCurrencyPairGroups.length;
  assert.equal(actualNumberOfCurrencyPairGroupsCount, noOfCurrencyPairGroups, 'Number of currency pair groups in the currency pair groups table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available pair groups$/, () => {
  for (let i = 1; i <= actualNumberOfCurrencyPairGroupsCount; i++) {
    const currencyGroupsRowData = pageObjects.SierraCurrencyPage.getCurrencyPairGroupsData(i);
    if (currencyGroupsRowData.includes('EUR/USD')) {
      assert.strictEqual('EUR/USD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('GBP/USD')) {
      assert.strictEqual('GBP/USD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/JPY')) {
      assert.strictEqual('USD/JPY',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('AUD/USD')) {
      assert.strictEqual('AUD/USD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/CHF')) {
      assert.strictEqual('USD/CHF',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/HKD')) {
      assert.strictEqual('USD/HKD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('NZD/USD')) {
      assert.strictEqual('NZD/USD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/ZAR')) {
      assert.strictEqual('USD/ZAR',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/SGD')) {
      assert.strictEqual('USD/SGD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/MXN')) {
      assert.strictEqual('USD/MXN',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyGroupsRowData.includes('USD/CAD')) {
      assert.strictEqual('USD/CAD',
        currencyGroupsRowData, `Currency pair groups data mismatch, check row ${i} with fis and update accordingly`);
    } else {
      console.error('Currency pair groups data not found');
    }
  }
});

Given(/^I click on currency holidays menu item$/, () => {
  pageObjects.SierraCurrencyPage.currencyHolidays.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraCurrencyPage.currencyHolidays.click();
  pageObjects.SierraCurrencyPage.currencyHolidaysHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

Given(/^I select a currency "([^"]*)" and year "([^"]*)"$/, (currency, year) => {
  pageObjects.SierraCurrencyPage.selectHolidayCurrency(currency);
  browser.pause(1000);
  pageObjects.SierraCurrencyPage.selectHolidayYear(year);
  browser.pause(1000);
  attachImageToCucumberReport();
});

When(/^I should see the correct number of currency holidays "([^"]*)"$/, async (numberOfHols) => {
  const actualHoliday = await pageObjects.SierraCurrencyPage.allHolidays;
  const actualHolidayCount = actualHoliday.length;
  const actualHolidaysHighlighted = await pageObjects.SierraCurrencyPage.holidaysHighlighted;
  const actualHolidaysHighlightedCount = actualHolidaysHighlighted.length;
  assert.equal(actualHolidayCount + actualHolidaysHighlightedCount, numberOfHols, 'Number of currency holidays is not matched');
});

Given(/^I click on fx rates menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.fxRates.click();
});

When(/^I should see the fx rates page$/, () => {
  pageObjects.SierraFxRatesPage.ratesTab.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should currency info and other rate information$/, () => {
  pageObjects.SierraFxRatesPage.currencyInfoHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraFxRatesPage.spotInterestForwardRatesHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraFxRatesPage.interestForwardRateGraphHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I select currency "([^"]*)"$/, (currency) => {
  pageObjects.SierraFxRatesPage.selectCurrency(currency);
  browser.pause(1000);
});

When(/^I click on tenors$/, () => {
  pageObjects.SierraFxRatesPage.tenors.click();
  pageObjects.SierraFxRatesPage.tenorsHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct tenors selected$/, () => {
  const today = pageObjects.SierraFxRatesPage.todayRb.getValue();
  console.log(today);
});

Given(/^I click on rates set menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.ratesSet.click();
});

Given(/^I click on CFE Types Definition menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.cfeTypeDefinition.click();
  pageObjects.SierraCfeTypeDefinitionPage.cfeTypeDefinitionHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of CFE Type Definitions "([^"]*)"$/, (noOfCfeTypeDefinitions) => {
  browser.pause(2000);
  pageObjects.SierraCfeTypeDefinitionPage.cfeTypeDefinitionTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfCfeTypeDefinitions = pageObjects.SierraCfeTypeDefinitionPage.cfeTypeDefinitionTableRow;
  actualNumberOfCfeTypeDefinitionsCount = actualNumberOfCfeTypeDefinitions.length;
  assert.equal(actualNumberOfCfeTypeDefinitionsCount, noOfCfeTypeDefinitions, 'Number of cfe type definitions in the cfe type definitions table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available CFE Type Definitions$/, () => {
  for (let i = 1; i <= actualNumberOfCfeTypeDefinitionsCount; i++) {
    const cfeTypeDefinitionRowData = pageObjects.SierraCfeTypeDefinitionPage.getCfeTypeDefinitionData(i);
    if (cfeTypeDefinitionRowData.includes('CPNOSPAY')) {
      assert.strictEqual('CPNOSPAY NOSTRO PAY/RECEIPT CP Nostro Pay Accounting Rule GLOBAL INTELLIMATCH',
        cfeTypeDefinitionRowData, `CFE Type Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (cfeTypeDefinitionRowData.includes('CPNOSREC')) {
      assert.strictEqual('CPNOSREC NOSTRO PAY/RECEIPT CP Nostro Receipt Accounting Rule GLOBAL INTELLIMATCH',
        cfeTypeDefinitionRowData, `CFE Type Definitions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
});

Given(/^I click on Entity Definition menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.entityDefinition.click();
  pageObjects.SierraEntityDefinitionPage.entityDefinitionHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Entity Definitions "([^"]*)"$/, (noOfEntityDefinitions) => {
  browser.pause(2000);
  pageObjects.SierraEntityDefinitionPage.entityDefinitionTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfEntityDefinitions = pageObjects.SierraEntityDefinitionPage.entityDefinitionTableRow;
  actualNumberOfEntityDefinitionsCount = actualNumberOfEntityDefinitions.length;
  assert.equal(actualNumberOfEntityDefinitionsCount, noOfEntityDefinitions, 'Number of entity definitions in the entity definitions table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Entity Definitions$/, () => {
  browser.waitUntil(
    () => (browser.getUrl().includes(e0) || browser.getUrl().includes(e1) || browser.getUrl().includes(e2)),
    waitConstants.WAIT_TIME_10_SECS,
    `Time out to determining environment, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes(e0)) {
    validateEntityDefinitionsE0();
  } else if (browser.getUrl().includes(e1)) {
    validateEntityDefinitionsE1();
  } else if (browser.getUrl().includes(e2)) {
    validateEntityDefinitionsE2();
  }
});

Given(/^I click on Settlement Instructions menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.settlementInstructions.click();
  pageObjects.SierraSettlementInstructionsPage.settlementInstructionsHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Settlement Instructions "([^"]*)"$/, (noOfSettlementInstructions) => {
  browser.pause(2000);
  pageObjects.SierraSettlementInstructionsPage.settlementInstructionsTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfSettlementInstructions = pageObjects.SierraSettlementInstructionsPage.settlementInstructionsTableRow;
  actualNumberOfSettlementInstructionsCount = actualNumberOfSettlementInstructions.length;
  assert.equal(actualNumberOfSettlementInstructionsCount, noOfSettlementInstructions, 'Number of settlement instructions in the settlement instructions table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Settlement Instructions$/, () => {
  browser.waitUntil(
    () => (browser.getUrl().includes(e0) || browser.getUrl().includes(e1) || browser.getUrl().includes(e2)),
    waitConstants.WAIT_TIME_10_SECS,
    `Time out to determining environment, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes(e0)) {
    validateSettlementInstructionsE0();
  } else if (browser.getUrl().includes(e1)) {
    validateSettlementInstructionsE1E2();
  } else if (browser.getUrl().includes(e2)) {
    validateSettlementInstructionsE1E2();
  }
});

Given(/^I click on Purpose Code menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.purposeCode.click();
  pageObjects.SierraPurposeCodePage.purposeCodeHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Purpose Code "([^"]*)"$/, (noOfPurposeCodes) => {
  browser.pause(2000);
  pageObjects.SierraPurposeCodePage.purposeCodeTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfPurposeCode = pageObjects.SierraPurposeCodePage.purposeCodeTableRow;
  actualNumberOfPurposeCodeCount = actualNumberOfPurposeCode.length;
  assert.equal(actualNumberOfPurposeCodeCount, noOfPurposeCodes, 'Number of purpose code in the purpose code table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Purpose Code$/, () => {
  browser.waitUntil(
    () => (browser.getUrl().includes(e0) || browser.getUrl().includes(e1) || browser.getUrl().includes(e2)),
    waitConstants.WAIT_TIME_10_SECS,
    `Time out to determining environment, actual url:: ${browser.getUrl()}`
  );
  if (browser.getUrl().includes(e0)) {
    validatePurposeCodeE0();
  } else if (browser.getUrl().includes(e1)) {
    validatePurposeCodeE1();
  } else if (browser.getUrl().includes(e2)) {
    validatePurposeCodeE2();
  }
});

Given(/^I click on Book Definition menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.bookDefinition.click();
  pageObjects.SierraBookDefinitionPage.bookDefinitionHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Book Definition "([^"]*)"$/, (noOfBookDefinition) => {
  browser.pause(2000);
  pageObjects.SierraBookDefinitionPage.bookDefinitionTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfBookDefinition = pageObjects.SierraBookDefinitionPage.bookDefinitionTableRow;
  actualNumberOfBookDefinitionCount = actualNumberOfBookDefinition.length;
  assert.equal(actualNumberOfBookDefinitionCount, noOfBookDefinition, 'Number of bookDefinition in the bookDefinition table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Book Definition$/, () => {
  for (let i = 1; i <= actualNumberOfBookDefinitionCount; i++) {
    const bookDefinitionRowData = pageObjects.SierraBookDefinitionPage.getBookDefinitionData(i);
    if (bookDefinitionRowData.includes('ANGB')) {
      assert.strictEqual('ANGB ANGlobal AN Global Book Real Active Yes AN INTR GL No Party A ANGlobal',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('ANLB')) {
      assert.strictEqual('ANLB ANLocal AN Local Book Real Active Yes AN INTR LO No Party A ANLocal',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('0002')) {
      assert.strictEqual('0002 DEMOBOOK DEMO LOCAL BOOK Real Active Yes INTERNAL-DEMO No Party A DEMO',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('0000')) {
      assert.strictEqual('0000 GLOBAL Global Trading Real Active Yes INTR-GLOBALMARKET No Party A GlobalFX',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('HAUP')) {
      assert.strictEqual('HAUP HAUP HAUP Real Active Yes LP CUSTOMER No Party A HAUPGRADE',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('ILPGB')) {
      assert.strictEqual('ILPGB LP GLOBA LP GLOBAL BOOK Real Active Yes LP INTER GM No Party A LPGLOBAL',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('LPLO')) {
      assert.strictEqual('LPLO LPLOCAL LP LOCAL BOOK Real Active Yes LP INTER LM No Party A LPLOCAL',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('MKGM')) {
      assert.strictEqual('MKGM MKGLOBAL MK Global Market Book Real Active Yes MK-INTR-GLOBAL No Party A ANGlobal',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('MKLM')) {
      assert.strictEqual('MKLM MKLOCAL MK Local Market Real Active Yes MK-INTR-LOCAL No Party A ANLocal',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('0001')) {
      assert.strictEqual('0001 USLOCAL US Local Market Real Active Yes INTR-LOCALMARKET No Party A USMarket',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('YGMB')) {
      assert.strictEqual('YGMB YGMB YPD Global Market Book Real Active Yes YPD INTR GM No Party A GMYPD',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    } else if (bookDefinitionRowData.includes('YLMB')) {
      assert.strictEqual('YLMB YLMB YPD Local Market Book Real Active Yes YPD INTR LM No Party A LMYPD',
        bookDefinitionRowData, `book definition data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
});

When(/^I should see the correct number of Desk "([^"]*)"$/, (noOfDesk) => {
  browser.pause(2000);
  pageObjects.SierraBookDefinitionPage.deskTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfDesk = pageObjects.SierraBookDefinitionPage.deskTableRow;
  actualNumberOfDeskCount = actualNumberOfDesk.length;
  assert.equal(actualNumberOfDeskCount, noOfDesk, 'Number of desk in the desk table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Desk$/, () => {
  for (let i = 1; i <= actualNumberOfDeskCount; i++) {
    const DeskRowData = pageObjects.SierraBookDefinitionPage.getDeskData(i);
    if (DeskRowData.includes('ANGlobal')) {
      assert.strictEqual('ANGlobal 2',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('ANLocal')) {
      assert.strictEqual('ANLocal 2',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('DEMO')) {
      assert.strictEqual('DEMO 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('GlobalFX')) {
      assert.strictEqual('GlobalFX 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('GMYPD')) {
      assert.strictEqual('GMYPD 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('HAUPGRADE')) {
      assert.strictEqual('HAUPGRADE 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('LECHU')) {
      assert.strictEqual('LECHU 0',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('LMYPD')) {
      assert.strictEqual('LMYPD 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('LPGLOBAL')) {
      assert.strictEqual('LPGLOBAL 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('LPLOCAL')) {
      assert.strictEqual('LPLOCAL 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('Test1')) {
      assert.strictEqual('Test1 0',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    } else if (DeskRowData.includes('USMarket')) {
      assert.strictEqual('USMarket 1',
        DeskRowData, `Desk data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
});

Given(/^I click on Accounting Entry Setup menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.accountingRules.click();
  pageObjects.SierraAccountingEntrySetupPage.accountingEntrySetupHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Accounting Entry Setup "([^"]*)"$/, (noOfAccountingEntrySetup) => {
  browser.pause(2000);
  pageObjects.SierraAccountingEntrySetupPage.accountingEntrySetupTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfAccountingEntrySetup = pageObjects.SierraAccountingEntrySetupPage.accountingEntrySetupTableRow;
  actualNumberOfAccountingEntrySetupCount = actualNumberOfAccountingEntrySetup.length;
  assert.equal(actualNumberOfAccountingEntrySetupCount, noOfAccountingEntrySetup, 'Number of accounting entry setup in the accounting entry setup table is not matched');
  attachImageToCucumberReport();
});

When(/^The table should contain available Accounting Entry Setup$/, () => {
  for (let i = 1; i <= actualNumberOfAccountingEntrySetupCount; i++) {
    const AccountingEntrySetupRowData = pageObjects.SierraAccountingEntrySetupPage.getAccountingEntrySetupData(i);
    if (AccountingEntrySetupRowData.includes('ANGlobal')) {
      assert.strictEqual('ANGlobal 2',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('ANLocal')) {
      assert.strictEqual('ANLocal 2',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('DEMO')) {
      assert.strictEqual('DEMO 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('GlobalFX')) {
      assert.strictEqual('GlobalFX 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('GMYPD')) {
      assert.strictEqual('GMYPD 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('HAUPGRADE')) {
      assert.strictEqual('HAUPGRADE 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('LECHU')) {
      assert.strictEqual('LECHU 0',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('LMYPD')) {
      assert.strictEqual('LMYPD 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('LPGLOBAL')) {
      assert.strictEqual('LPGLOBAL 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('LPLOCAL')) {
      assert.strictEqual('LPLOCAL 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('Test1')) {
      assert.strictEqual('Test1 0',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    } else if (AccountingEntrySetupRowData.includes('USMarket')) {
      assert.strictEqual('USMarket 1',
        AccountingEntrySetupRowData, `Accounting entry setup data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
});

Given(/^I click on Accounting Code Definition menu item$/, () => {
  pageObjects.SierraHomePage.defineMenuItem.click();
  pageObjects.SierraHomePage.accountCodeDefinition.click();
  pageObjects.SierraAccountingCodeDefinitionPage.accountingCodeDefinitionsHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

Given(/^I select Account Number Mapping checkbox$/, () => {
  pageObjects.SierraAccountingCodeDefinitionPage.AccountNumberMappingCheckbox.click();
  pageObjects.SierraAccountingCodeDefinitionPage.accountNumberMappingHeading.waitForExist(waitConstants.WAIT_TIME_60_SECS);
});

When(/^I should see the correct number of Account Number Mappings "([^"]*)" "([^"]*)"$/, (noOfAccountNumberMappings, totalCount) => {
  browser.pause(3000);
  pageObjects.SierraAccountingCodeDefinitionPage.accountNumberMappingTablePager.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  const actualNumberOfAccountNumberMapping = pageObjects.SierraAccountingCodeDefinitionPage.accountNumberMappingTableRow;
  actualNumberOfAccountNumberMappingCount = actualNumberOfAccountNumberMapping.length;
  assert.equal(actualNumberOfAccountNumberMappingCount, noOfAccountNumberMappings, 'Number of accounting number mapping in the account number mapping table is not matched');
  const totalNumberMappingCount = pageObjects.SierraAccountingCodeDefinitionPage.accountNumberMappingTablePager.getText();
  assert.equal(totalNumberMappingCount, totalCount, 'Total number of accounting number mapping in the account number mapping table is not matched');
  attachImageToCucumberReport();
});

Given(/^I click on Filter Templates menu item$/, () => {
  pageObjects.SierraHomePage.toolsAndReportingMenuItem.click();
  pageObjects.SierraHomePage.filterTemplate.click();
});

When(/^I select Filter Type "([^"]*)"$/, (filterType) => {
  pageObjects.SierraFilterTemplatePage.filterType.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraFilterTemplatePage.selectFilterType(filterType);
});

When(/^The Template Name dropdown should contain "([^"]*)"$/, (templates) => {
  browser.pause(3000);
  pageObjects.SierraFilterTemplatePage.templateNameDropdownButton.waitForExist(waitConstants.WAIT_TIME_60_SECS);
  pageObjects.SierraFilterTemplatePage.templateNameDropdownButton.click();
  const value = pageObjects.SierraFilterTemplatePage.templateAttempt.map(result => result.getText());
  const filteredValues = value.filter(values => values.length > 0);
  assert.deepEqual(filteredValues, templates.split(','), 'Templates do not match the selected filter type');
});

When(/^I should logout$/, () => {
  pageObjects.SierraHomePage.logout.click();
});

const validateCurrencyPairsE0 = () => {
  for (let i = 1; i <= actualNumberOfCurrencyPairsCount; i++) {
    const currencyPairsRowData = pageObjects.SierraCurrencyPage.getCurrencyPairsData(i);
    if (currencyPairsRowData.includes('AUD USD')) {
      assert.strictEqual('AUD USD AUD AUD USD per AUD 2 15 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2040',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('EUR GBP')) {
      assert.strictEqual('EUR GBP GBP EUR GBP per EUR 2 10 0.0001 0.0 SPLINE EUR 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('EUR USD')) {
      assert.strictEqual('EUR USD EUR EUR USD per EUR 2 15 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('GBP USD')) {
      assert.strictEqual('GBP USD GBP GBP USD per GBP 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('NZD USD')) {
      assert.strictEqual('NZD USD NZD NZD USD per NZD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD CAD')) {
      assert.strictEqual('USD CAD CAD CAD CAD per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD CHF')) {
      assert.strictEqual('USD CHF CHF CHF CHF per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD HKD')) {
      assert.strictEqual('USD HKD HKD HKD HKD per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD JPY')) {
      assert.strictEqual('USD JPY JPY JPY JPY per USD 2 10 0.01 0.1 SPLINE USD 2 N/A Currency Pair No 17Apr2030',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD MXN')) {
      assert.strictEqual('USD MXN MXN MXN MXN per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD SGD')) {
      assert.strictEqual('USD SGD SGD SGD SGD per USD 2 10 0.0001 0.1 SPLINE SGD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD ZAR')) {
      assert.strictEqual('USD ZAR ZAR ZAR ZAR per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else {
      console.error('Currency pairs data not found');
    }
  }
};

const validateCurrencyPairsE1E2 = () => {
  for (let i = 1; i <= actualNumberOfCurrencyPairsCount; i++) {
    const currencyPairsRowData = pageObjects.SierraCurrencyPage.getCurrencyPairsData(i);
    if (currencyPairsRowData.includes('AUD USD')) {
      assert.strictEqual('AUD USD AUD AUD USD per AUD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('EUR USD')) {
      assert.strictEqual('EUR USD EUR EUR USD per EUR 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('GBP USD')) {
      assert.strictEqual('GBP USD GBP GBP USD per GBP 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('NZD USD')) {
      assert.strictEqual('NZD USD NZD NZD USD per NZD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD CAD')) {
      assert.strictEqual('USD CAD CAD CAD CAD per USD 1 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD CHF')) {
      assert.strictEqual('USD CHF CHF CHF CHF per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD HKD')) {
      assert.strictEqual('USD HKD HKD HKD HKD per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD JPY')) {
      assert.strictEqual('USD JPY JPY JPY JPY per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD MXN')) {
      assert.strictEqual('USD MXN MXN MXN MXN per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD SGD')) {
      assert.strictEqual('USD SGD SGD SGD SGD per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else if (currencyPairsRowData.includes('USD ZAR')) {
      assert.strictEqual('USD ZAR ZAR ZAR ZAR per USD 2 10 0.0001 0.1 SPLINE USD 2 N/A Currency Pair No 31Dec2049',
        currencyPairsRowData, `Currency pairs data mismatch, check row ${i} with fis and update accordingly`);
    } else {
      console.error('Currency pairs data not found');
    }
  }
};

const validateSettlementInstructionsE0 = () => {
  for (let i = 1; i <= actualNumberOfSettlementInstructionsCount; i++) {
    const settlementInstructionsRowData = pageObjects.SierraSettlementInstructionsPage.getSettlementInstructionsData(i);
    if (settlementInstructionsRowData.includes('101 BANK1')) {
      assert.strictEqual('101 BANK1 SS1 BANK1INR INR Primary 12345677 JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7111490 12Nov2020 11:06:13',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('21 BANK1')) {
      assert.strictEqual('21 BANK1 SSI BANK1 USD USD Primary SSI BANK1 USD JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7111490 18Sep2020 05:26:51',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('22 BANK1')) {
      assert.strictEqual('22 BANK1 SSI BANK1 EUR EUR Primary SSI BANK1 EUR JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7147161 18Jun2020 09:54:14',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('23 BANK1')) {
      assert.strictEqual('23 BANK1 SSI BANK1 GBP GBP Primary SSI BANK1 GBP JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7147161 18Jun2020 09:54:14',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('152 BANK1')) {
      assert.strictEqual('152 BANK1 SSI BANK1 AUD AUD Primary SSI BANK1 AUD JP Morgan AUDSSITEST1 ALL SWIFT Active C7147161 25Nov2020 06:02:31',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('153 BANK1')) {
      assert.strictEqual('153 BANK1 SSI BANK1 CAD CAD Primary SSI BANK1 CAD JP Morgan CADSSITEST1 ALL SWIFT Active C7147161 25Nov2020 06:02:31',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('154 BANK1')) {
      assert.strictEqual('154 BANK1 SSI BANK1 JPY JPY Primary SSI BANK1 JPY JP Morgan JPYSSITEST1 ALL SWIFT Active C7147161 26Nov2020 04:25:12',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('41 BANK1')) {
      assert.strictEqual('41 BANK1 DEMOSSI INR Primary 12345 JP MORGAN ABCDEF12345 ALL SWIFT Active C7111490 23Apr2020 09:35:11',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('24 BANK2')) {
      assert.strictEqual('24 BANK2 SSI BANK2 EUR EUR Primary SSI BANK2 EUR HSBC HBUKGB4BZZZ ALL SWIFT Active C7147161 21Apr2020 14:03:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('25 BANK2')) {
      assert.strictEqual('25 BANK2 SSI BANK2 GBP GBP Primary SSI BANK2 GBP HSBC HBUKGB4BZZZ ALL SWIFT Active C7147161 21Apr2020 14:05:36',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('26 BANK2')) {
      assert.strictEqual('26 BANK2 SSI BANK2 USD USD Primary SSI BANK2 USD HSBC HBUKGB4BZZZ ALL SWIFT Active C7147161 20May2020 12:27:30',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('155 BANK2')) {
      assert.strictEqual('155 BANK2 SSI BANK2 AUD AUD Primary SSI BANK2 AUD HSBC AUDSSITEST2 ALL SWIFT Active C7147161 25Nov2020 06:05:40',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('156 BANK2')) {
      assert.strictEqual('156 BANK2 SSI BANK2 CAD CAD Primary SSI BANK2 CAD HSBC CADSSITEST2 ALL SWIFT Active C7147161 26Nov2020 04:29:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('157 BANK2')) {
      assert.strictEqual('157 BANK2 SSI BANK2 JPY JPY Primary SSI BANK2 JPY HSBC JPYSSITEST2 ALL SWIFT Active C7147161 26Nov2020 04:29:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('27 BANK3')) {
      assert.strictEqual('27 BANK3 SSI BANK3 EUR EUR Primary SSI BANK3 EUR BOA BOFAUS3NZZZ ALL SWIFT Active C7147161 21Apr2020 14:08:30',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('28 BANK3')) {
      assert.strictEqual('28 BANK3 SSI BANK3 GBP GBP Primary SSI BANK3 GBP BOA BOFAUS3NZZZ ALL SWIFT Active C7111490 12Nov2020 11:06:13',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('29 BANK3')) {
      assert.strictEqual('29 BANK3 SSI BANK3 USD USD Primary SSI BANK3 USD BOA BOFAUS3NZZZ ALL SWIFT Active C7147161 21Apr2020 14:16:33',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('158 BANK3')) {
      assert.strictEqual('158 BANK3 SSI BANK3 AUD AUD Primary SSI BANK3 AUD BOA AUDSSITEST3 ALL SWIFT Active C7147161 25Nov2020 06:09:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('159 BANK3')) {
      assert.strictEqual('159 BANK3 SSI BANK3 CAD CAD Primary SSI BANK3 CAD BOA CADSSITEST3 ALL SWIFT Active C7147161 25Nov2020 06:09:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('160 BANK3')) {
      assert.strictEqual('160 BANK3 SSI BANK3 JPY JPY Primary SSI BANK3 JPY BOA JPYSSITEST3 ALL SWIFT Active C7147161 25Nov2020 06:09:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('30 BANK4')) {
      assert.strictEqual('30 BANK4 SSI BANK4 EUR EUR Primary SSI BANK4 EUR HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:16:33',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('31 BANK4')) {
      assert.strictEqual('31 BANK4 SSI BANK4 GBP GBP Primary SSI BANK4 GBP HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:18:04',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('32 BANK4')) {
      assert.strictEqual('32 BANK4 SSI BANK4 USD USD Primary SSI BANK4 USD HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:19:30',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('161 BANK4')) {
      assert.strictEqual('161 BANK4 SSI BANK4 AUD AUD Primary SSI BANK4 AUD HSBC AUDSSITEST4 ALL SWIFT Active C7147161 25Nov2020 06:11:58',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('162 BANK4')) {
      assert.strictEqual('162 BANK4 SSI BANK4 CAD CAD Primary SSI BANK4 CAD HSBC CADSSITEST4 ALL SWIFT Active C7147161 25Nov2020 06:11:58',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('163 BANK4')) {
      assert.strictEqual('163 BANK4 SSI BANK4 JPY JPY Primary SSI BANK4 JPY HSBC JPYSSITEST4 ALL SWIFT Active C7147161 26Nov2020 05:05:59',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('33 BANK5')) {
      assert.strictEqual('33 BANK5 SSI BANK5 USD USD Primary SSI BANK5 USD Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:21:36',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('34 BANK5')) {
      assert.strictEqual('34 BANK5 SSI BANK5 GBP GBP Primary SSI BANK5 GBP Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:23:02',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('35 BANK5')) {
      assert.strictEqual('35 BANK5 SSI BANK5 EUR EUR Primary SSI BANK5 EUR Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 21Apr2020 14:26:03',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('164 BANK5')) {
      assert.strictEqual('164 BANK5 SSI BANK5 AUD AUD Primary SSI BANK5 AUD Barclays AUDSSITEST5 ALL SWIFT Active C7147161 25Nov2020 06:15:54',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('165 BANK5')) {
      assert.strictEqual('165 BANK5 SSI BANK5 CAD CAD Primary SSI BANK5 CAD Barclays CADSSITEST5 ALL SWIFT Active C7147161 25Nov2020 06:15:54',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('166 BANK5')) {
      assert.strictEqual('166 BANK5 SSI BANK5 JPY JPY Primary SSI BANK5 JPY Barclays JPYSSITEST5 ALL SWIFT Active C7147161 25Nov2020 06:15:54',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('102 YPD')) {
      assert.strictEqual('102 YPD CUST ABC YPD-SSI-CAD CAD Primary       ALL SWIFT Active C7122384 18May2020 12:01:51',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validateSettlementInstructionsE1E2 = () => {
  for (let i = 1; i <= actualNumberOfSettlementInstructionsCount; i++) {
    const settlementInstructionsRowData = pageObjects.SierraSettlementInstructionsPage.getSettlementInstructionsData(i);
    if (settlementInstructionsRowData.includes('42 BANK1')) {
      assert.strictEqual('42 BANK1 SSI BANK1 EUR EUR Primary SSI BANK1 EUR JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7147161 18Jun2020 09:40:34',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('43 BANK1')) {
      assert.strictEqual('43 BANK1 SSI BANK1 GBP GBP Primary SSI BANK1 GBP JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7147161 18Jun2020 09:40:34',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('93 BANK1')) {
      assert.strictEqual('93 BANK1 SSI BANK1 AUD AUD Primary SSI BANK1 AUD JP Morgan AUDSSITEST1 ALL SWIFT Active C7147161 26Nov2020 04:25:07',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('94 BANK1')) {
      assert.strictEqual('94 BANK1 SSI BANK1 CAD CAD Primary SSI BANK1 CAD JP Morgan CADSSITEST1 ALL SWIFT Active C7147161 26Nov2020 04:25:07',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('95 BANK1')) {
      assert.strictEqual('95 BANK1 SSI BANK1 JPY JPY Primary SSI BANK1 JPY JP Morgan JPYSSITEST1 ALL SWIFT Active C7147161 26Nov2020 04:25:07',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('97 BANK2')) {
      assert.strictEqual('97 BANK2 SSI BANK2 CAD CAD Primary SSI BANK2 CAD HSBC CADSSITEST2 ALL SWIFT Active C7147161 26Nov2020 04:29:08',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('98 BANK2')) {
      assert.strictEqual('98 BANK2 SSI BANK2 JPY JPY Primary SSI BANK2 JPY HSBC JPYSSITEST2 ALL SWIFT Active C7147161 26Nov2020 04:29:08',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('41 BANK1')) {
      assert.strictEqual('41 BANK1 SSI BANK1 USD USD Primary SSI BANK1 USD JP Morgan CHASUSU3ZZZ ALL SWIFT Active C7147161 18Jun2020 09:40:34',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('44 BANK2')) {
      assert.strictEqual('44 BANK2 SSI BANK2 GBP GBP Primary SSI BANK2 GBP HSBC HBUKGB4BZZZ ALL SWIFT Active C7111490 18Nov2020 07:01:26',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('45 BANK2')) {
      assert.strictEqual('45 BANK2 SSI BANK2 EUR EUR Primary SSI BANK2 EUR HSBC HBUKGB4BZZZ ALL SWIFT Active C7147161 22Apr2020 11:22:38',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('96 BANK2')) {
      assert.strictEqual('96 BANK2 SSI BANK2 AUD AUD Primary SSI BANK2 AUD HSBC AUDSSITEST2 ALL SWIFT Active C7147161 26Nov2020 04:29:08',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('99 BANK3')) {
      assert.strictEqual('99 BANK3 SSI BANK3 AUD AUD Primary SSI BANK3 AUD BOA AUDSSITEST3 ALL SWIFT Active C7147161 26Nov2020 04:56:54',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('101 BANK3')) {
      assert.strictEqual('101 BANK3 SSI BANK3 CAD CAD Primary SSI BANK3 CAD BOA CADSSITEST3 ALL SWIFT Active C7147161 26Nov2020 04:58:42',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('102 BANK3')) {
      assert.strictEqual('102 BANK3 SSI BANK3 JPY JPY Primary SSI BANK3 JPY BOA JPYSSITEST3 ALL SWIFT Active C7147161 26Nov2020 04:59:35',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('47 BANK3')) {
      assert.strictEqual('47 BANK3 SSI BANK3 USD USD Primary SSI BANK3 USD BOA BOFAUS3NZZZ ALL SWIFT Active C7147161 22Apr2020 11:29:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('48 BANK3')) {
      assert.strictEqual('48 BANK3 SSI BANK3 GBP GBP Primary SSI BANK3 GBP BOA BOFAUS3NZZZ ALL SWIFT Active C7147161 22Apr2020 11:24:42',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('49 BANK3')) {
      assert.strictEqual('49 BANK3 SSI BANK3 EUR EUR Primary SSI BANK3 EUR BOA BOFAUS3NZZZ ALL SWIFT Active C7147161 22Apr2020 11:24:42',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('103 BANK4')) {
      assert.strictEqual('103 BANK4 SSI BANK4 AUD AUD Primary SSI BANK4 AUD HSBC AUDSSITEST4 ALL SWIFT Active C7147161 26Nov2020 05:03:26',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('104 BANK4')) {
      assert.strictEqual('104 BANK4 SSI BANK4 CAD CAD Primary SSI BANK4 CAD HSBC CADSSITEST4 ALL SWIFT Active C7147161 26Nov2020 05:04:50',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('105 BANK4')) {
      assert.strictEqual('105 BANK4 SSI BANK4 JPY JPY Primary SSI BANK4 JPY HSBC JPYSSITEST4 ALL SWIFT Active C7147161 26Nov2020 05:05:56',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('50 BANK4')) {
      assert.strictEqual('50 BANK4 SSI BANK4 EUR EUR Primary SSI BANK4 EUR HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:26:43',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('51 BANK4')) {
      assert.strictEqual('51 BANK4 SSI BANK4 GBP GBP Primary SSI BANK4 GBP HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:26:43',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('52 BANK4')) {
      assert.strictEqual('52 BANK4 SSI BANK4 USD USD Primary SSI BANK4 USD HSBC MIDLGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:29:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('106 BANK5')) {
      assert.strictEqual('106 BANK5 SSI BANK5 AUD AUD Primary SSI BANK5 AUD Barclays AUDSSITEST5 ALL SWIFT Active C7147161 26Nov2020 05:06:59',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('107 BANK54')) {
      assert.strictEqual('107 BANK5 SSI BANK5 CAD CAD Primary SSI BANK5 CAD Barclays CADSSITEST5 ALL SWIFT Active C7147161 26Nov2020 05:07:57',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('163 BANK4108 BANK5')) {
      assert.strictEqual('108 BANK5 SSI BANK5 JPY JPY Primary SSI BANK5 JPY Barclays JPYSSITEST5 ALL SWIFT Active C7147161 26Nov2020 05:08:51',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('53 BANK5')) {
      assert.strictEqual('53 BANK5 SSI BANK5 USD USD Primary SSI BANK5 USD Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:29:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('54 BANK5')) {
      assert.strictEqual('54 BANK5 SSI BANK5 GBP GBP Primary SSI BANK5 GBP Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:29:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('55 BANK5')) {
      assert.strictEqual('55 BANK5 SSI BANK5 EUR EUR Primary SSI BANK5 EUR Barclays BARCGB22ZZZ ALL SWIFT Active C7147161 22Apr2020 11:29:24',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (settlementInstructionsRowData.includes('46 BANK2')) {
      assert.strictEqual('46 BANK2 SSI BANK2 USD USD Primary SSI BANK2 USD HSBC TESTGB4BZZZ ALL SWIFT Active C7147161 24Jul2020 10:28:27',
        settlementInstructionsRowData, `Settlement instructions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validateEntityDefinitionsE0 = () => {
  for (let i = 1; i <= actualNumberOfEntityDefinitionsCount; i++) {
    const entityDefinitionRowData = pageObjects.SierraEntityDefinitionPage.getEntityDefinitionData(i);
    if (entityDefinitionRowData.includes('AMEXCBP')) {
      assert.strictEqual('AMEXCBP Counterparty American Express CUST Active                                            n/a n/a 0005 15OCT1997',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('AN INTR GL')) {
      assert.strictEqual('AN INTR GL Counterparty AN Internal Global INTR Active                                            n/a n/a 5678 01MAY2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('AN INTR LO')) {
      assert.strictEqual('AN INTR LO Counterparty AN Internal Local INTR Active                                            n/a n/a 1234 01MAY2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK OF AMERICA')) {
      assert.strictEqual('BANK OF AMERICA Counterparty Bank of America BANK Active                                            n/a n/a 0004 15OCT1997',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK1')) {
      assert.strictEqual('BANK1 Counterparty BANK1- test for FXPoms BANK Active                                          CHASUSU3YYY n/a n/a 0006 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK2')) {
      assert.strictEqual('BANK2 Counterparty BANK2- Test for FXPoms BANK Active                                          HBUKGB4BYYY n/a n/a 0007 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK3')) {
      assert.strictEqual('BANK3 Counterparty BANK3- test for FXPoms BANK Active                                          BOFAUS3NYYY n/a n/a 0008 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK4')) {
      assert.strictEqual('BANK4 Counterparty BANK4- test for FXPoms BANK Active                                          MIDLGB22YYY n/a n/a 0009 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK5')) {
      assert.strictEqual('BANK5 Counterparty BANK5- test for FXPoms BANK Active                                          BARCGB22YYY n/a n/a 000A 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK7')) {
      assert.strictEqual('BANK7 Counterparty BANK7-DEMO BANK Active                                          ABCDEFG1234 n/a n/a 000D 23APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTELLIMATCH')) {
      assert.strictEqual('INTELLIMATCH Counterparty IntelliMatch Entity for IntelliMatch Messaging INMS Active                                            n/a n/a 000M 16JUN2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTERNAL-DEMO')) {
      assert.strictEqual('INTERNAL-DEMO Counterparty INTERNAL DEMO INTR Active                                            n/a n/a 000C 21APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-GLOBALMARKET')) {
      assert.strictEqual('INTR-GLOBALMARKET Counterparty Internal - Global Market INTR Active                                            n/a n/a 0002 15OCT1997',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-LOCALMARKET')) {
      assert.strictEqual('INTR-LOCALMARKET Counterparty Internal - Local Market INTR Active                                            n/a n/a 0003 15OCT1997',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('LP CUSTOMER')) {
      assert.strictEqual('LP CUSTOMER Counterparty LP CUSTOMERban CUST Active                                            n/a n/a 000J 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('LP INTER GM')) {
      assert.strictEqual('LP INTER GM Counterparty LP INTERNAL GLOBAL MARKET INTR Active                                            n/a n/a 000I 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('LP INTER LM')) {
      assert.strictEqual('LP INTER LM Counterparty LP INTERNAL LOCAL MARKET INTR Active                                            n/a n/a 000H 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('MK-INTR-GLOBAL')) {
      assert.strictEqual('MK-INTR-GLOBAL Counterparty MK-INTR-GLOBAL INTR Active                                            n/a n/a 000L 01JUN2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('MK-INTR-LOCAL')) {
      assert.strictEqual('MK-INTR-LOCAL Counterparty MK-INTR-LOCAL INTR Active                                            n/a n/a 000K 01JUN2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('YPD CUST ABC')) {
      assert.strictEqual('YPD CUST ABC Counterparty YPD CUSTOMER ABC CUST Active                                            n/a n/a 000G 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('YPD INTR GM')) {
      assert.strictEqual('YPD INTR GM Counterparty YPD Internal GM INTR Active                                            n/a n/a 000F 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('YPD INTR LM')) {
      assert.strictEqual('YPD INTR LM Counterparty YPD Internal LM INTR Active                                            n/a n/a 000E 30APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validateEntityDefinitionsE1 = () => {
  for (let i = 1; i <= actualNumberOfEntityDefinitionsCount; i++) {
    const entityDefinitionRowData = pageObjects.SierraEntityDefinitionPage.getEntityDefinitionData(i);
    if (entityDefinitionRowData.includes('AMEXCBP')) {
      assert.strictEqual('AMEXCBP Counterparty American Express CUST Active                                            n/a n/a 0001 20FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK-OF-AMERICA')) {
      assert.strictEqual('BANK-OF-AMERICA Counterparty Bank of America BANK Active                                            n/a n/a 0002 20FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK1')) {
      assert.strictEqual('BANK1 Counterparty BANK1- test for FXPoms BANK Active                                          CHASUSU3YYY n/a n/a 0005 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK2')) {
      assert.strictEqual('BANK2 Counterparty BANK2- test for FX Poms BANK Active                                          HBUKGB4BYYY n/a n/a 0006 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK3')) {
      assert.strictEqual('BANK3 Counterparty BANK3- test for FXPoms BANK Active                                          BOFAUS3NYYY n/a n/a 0007 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK4')) {
      assert.strictEqual('BANK4 Counterparty BANK4- test for FXPoms BANK Active                                          MIDLGB22YYY n/a n/a 0008 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK5')) {
      assert.strictEqual('BANK5 Counterparty BANK5- test for FXPoms BANK Active                                          BARCGB22YYY n/a n/a 0009 28FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTELLIMATCH')) {
      assert.strictEqual('INTELLIMATCH Counterparty IntelliMatch Entity for IntelliMatch Messaging INMS Active                                            n/a n/a 000B 16JUN2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-GLOBALMARKET')) {
      assert.strictEqual('INTR-GLOBALMARKET Counterparty Internal - Global Market INTR Active                                            n/a n/a 0003 20FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-LOCALMARKET')) {
      assert.strictEqual('INTR-LOCALMARKET Counterparty Internal - Local Market INTR Active                                            n/a n/a 0004 20FEB2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validateEntityDefinitionsE2 = () => {
  for (let i = 1; i <= actualNumberOfEntityDefinitionsCount; i++) {
    const entityDefinitionRowData = pageObjects.SierraEntityDefinitionPage.getEntityDefinitionData(i);
    if (entityDefinitionRowData.includes('AMEXCBP')) {
      assert.strictEqual('AMEXCBP Counterparty American Express CUST Active                                            n/a n/a 0001 26MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK1')) {
      assert.strictEqual('BANK1 Counterparty BANK1- test for FXPoms BANK Active                                          ZYXHUS30 n/a n/a 0004 27MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK2')) {
      assert.strictEqual('BANK2 Counterparty BANK2- test for FXPoms BANK Active                                          ZYXHUS30 n/a n/a 0005 27MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK3')) {
      assert.strictEqual('BANK3 Counterparty BANK3- test for FXPoms BANK Active                                          ZYXHUS30 n/a n/a 0006 27MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK4')) {
      assert.strictEqual('BANK4 Counterparty BANK4- test for FXPoms BANK Active                                          ZYXHUS30 n/a n/a 0007 27MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK5')) {
      assert.strictEqual('BANK5 Counterparty BANK5- test for FXPoms BANK Active                                          ZYXHUS30 n/a n/a 0008 27MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('BANK7')) {
      assert.strictEqual('BANK7 Counterparty BANK7-DEMO BANK Active                                          ABCDEFG1234 n/a n/a 000D 23APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTELLIMATCH')) {
      assert.strictEqual('INTELLIMATCH Counterparty IntelliMatch Entity for IntelliMatch Messaging INMS Active                                            n/a n/a 0009 18JUN2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTERNAL-DEMO')) {
      assert.strictEqual('INTERNAL-DEMO Counterparty INTERNAL DEMO INTR Active                                            n/a n/a 000C 21APR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-GLOBALMARKET')) {
      assert.strictEqual('INTR-GLOBALMARKET Counterparty Internal - Global Market INTR Active                                            n/a n/a 0002 26MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    } else if (entityDefinitionRowData.includes('INTR-LOCALMARKET')) {
      assert.strictEqual('INTR-LOCALMARKET Counterparty Internal - Local Market INTR Active                                            n/a n/a 0003 26MAR2020',
        entityDefinitionRowData, `Entity Definitions data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validatePurposeCodeE0 = () => {
  for (let i = 1; i <= actualNumberOfPurposeCodeCount; i++) {
    const purposeCodeRowData = pageObjects.SierraPurposeCodePage.getPurposeCodeData(i);
    if (purposeCodeRowData.includes('AUTO')) {
      assert.strictEqual('AUTO Auto Auto-Hedge deal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('DEAL')) {
      assert.strictEqual('DEAL Dealer Dealer trade-external',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('EXTR')) {
      assert.strictEqual('EXTR External External Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('FEES')) {
      assert.strictEqual('FEES Fees Fees',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('IMMS')) {
      assert.strictEqual('IMMS IntelliM Intelli Match CFE',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('INTR')) {
      assert.strictEqual('INTR INTR Internal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('LPPS')) {
      assert.strictEqual('LPPS LPPS INT LPPS INTERNAL',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('MANU')) {
      assert.strictEqual('MANU Manual Manual trade-from Sierra',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TEST')) {
      assert.strictEqual('TEST TEST TEST',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TRAD')) {
      assert.strictEqual('TRAD Trade Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('YPD')) {
      assert.strictEqual('YPD YPD YPD',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validatePurposeCodeE1 = () => {
  for (let i = 1; i <= actualNumberOfPurposeCodeCount; i++) {
    const purposeCodeRowData = pageObjects.SierraPurposeCodePage.getPurposeCodeData(i);
    if (purposeCodeRowData.includes('AUTO')) {
      assert.strictEqual('AUTO Auto Auto-Hedge deal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('DEAL')) {
      assert.strictEqual('DEAL Dealer Dealer trade-external',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('EXTR')) {
      assert.strictEqual('EXTR External External Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('FEES')) {
      assert.strictEqual('FEES Fees Fees',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('IMMS')) {
      assert.strictEqual('IMMS IntelliM Intelli Match CFE',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('INTR')) {
      assert.strictEqual('INTR INTR Internal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('LPPS')) {
      assert.strictEqual('LPPS LPPS INT LPPS INTERNAL',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('MANU')) {
      assert.strictEqual('MANU Manual Manual trade-from Sierra',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TEST')) {
      assert.strictEqual('TEST TEST TEST',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TRAD')) {
      assert.strictEqual('TRAD Trade Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('YPD')) {
      assert.strictEqual('YPD YPD YPD',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};

const validatePurposeCodeE2 = () => {
  for (let i = 1; i <= actualNumberOfPurposeCodeCount; i++) {
    const purposeCodeRowData = pageObjects.SierraPurposeCodePage.getPurposeCodeData(i);
    if (purposeCodeRowData.includes('AUTO')) {
      assert.strictEqual('AUTO Auto Auto-Hedge deal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('DEAL')) {
      assert.strictEqual('DEAL Dealer Dealer trade-external',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('EXTR')) {
      assert.strictEqual('EXTR External External Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('FEES')) {
      assert.strictEqual('FEES Fees Fees',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('IMMS')) {
      assert.strictEqual('IMMS IntelliM Intelli Match CFE',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('INTR')) {
      assert.strictEqual('INTR INTR Internal',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('LPPS')) {
      assert.strictEqual('LPPS LPPS INT LPPS INTERNAL',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('MANU')) {
      assert.strictEqual('MANU Manual Manual trade - from Sierra',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TEST')) {
      assert.strictEqual('TEST TEST TEST',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('TRAD')) {
      assert.strictEqual('TRAD Trade Trade',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    } else if (purposeCodeRowData.includes('YPD')) {
      assert.strictEqual('YPD YPD YPD',
        purposeCodeRowData, `Purpose Code data mismatch, check row ${i} with fis and update accordingly`);
    }
  }
};
