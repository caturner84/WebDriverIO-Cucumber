import cucumberJson from 'wdio-cucumberjs-json-reporter';

module.exports.attachImageToCucumberReport = () => _wdioCucumberjsJsonReporter.default.attach(browser.takeScreenshot(), 'image/png');

module.exports.attachDataToCucumberReport = data => _wdioCucumberjsJsonReporter.default.attach(data, 'application/json');