import WebdriverIoHomePage from '../page_objects/webdriverio.home.page';
import attachImageToCucumberReport from '../utils/helper';

import {Given, Then, When} from 'cucumber'

Given(/^I am webdriver page$/, function () {
    WebdriverIoHomePage.open();
    attachImageToCucumberReport();
});

When(/^get the title$/, function () {
    const title = browser.getTitle();
    console.log(title);
    assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js');
});

Then(/^title should be matched$/, async function () {
    // let result = await connection.execute('select * from demo');
    // console.log(result.rows());
});