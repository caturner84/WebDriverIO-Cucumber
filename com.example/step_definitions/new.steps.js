import WebdriverIoHomePage from '../page_objects/test';

const { Given, When, Then } = require('cucumber');

Given(/^I am webdriver page$/, () => {
    WebdriverIoHomePage.open();
    browser.waitUntil(
        ()=> (browser.getUrl().includes('/docs/frameworks/')),6000,
        `timeout waiting for page to load:: ${browser.getUrl()}`
        );
});

When(/^get the title$/, () => {
    const title = browser.getTitle();
    console.log(title);
    assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js');
});

Then(/^title should be matched$/, () => {
    // let result = await connection.execute('select * from demo');
    // console.log(result.rows());
});
