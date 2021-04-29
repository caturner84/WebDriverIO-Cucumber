import cucumberJson from 'wdio-cucumberjs-json-reporter';

module.exports.attachImageToCucumberReport = () => cucumberJson.attach(browser.takeScreenshot(), 'image/png');

module.exports.attachDataToCucumberReport = data => cucumberJson.attach(data, 'application/json');
