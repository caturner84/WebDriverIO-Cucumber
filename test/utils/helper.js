"use strict";

module.exports.getDBConfig = function () {

   //we can return environment specific details here
    return {
        user: 'userName',
        password: 'password',
        connectString: 'connectionString'
    }
}

var _wdioCucumberjsJsonReporter = _interopRequireDefault(require("wdio-cucumberjs-json-reporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.attachImageToCucumberReport = () => _wdioCucumberjsJsonReporter.default.attach(browser.takeScreenshot(), 'image/png');

module.exports.attachDataToCucumberReport = data => _wdioCucumberjsJsonReporter.default.attach(data, 'application/json');