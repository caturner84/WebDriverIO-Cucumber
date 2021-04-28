const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const browserConfig = require('./test/utils/browser');
const databaseConfig = require('./test/utils/database.config');
const constants = require('./test/constants/config_constants');
const yargs = require('yargs');
const chai = require('chai');

const parseCmdArgs = () => yargs.argv;
const getCmdArgs = () => parseCmdArgs();
const getRunOnSauce = () => getCmdArgs().runOnSauce || false;
const getBrowser = () => getCmdArgs().browserName || constants.CHROME;
const getOS = () => getCmdArgs().os || constants.WINDOWS;
const getThreadCount = () => getCmdArgs().threadCount || 1;
const getSauceKey = () => getCmdArgs().sauceAccessKey;

const config = {
    specs: [
        './test/features/**/*.feature'
    ],
    suites: {
        webdriverTest: [
            './test/features/sample.feature'
        ],
    },
    exclude: [],
    specFileRetries: 1,
    runner: 'local',
    maxInstances: getThreadCount(),
    capabilities: browserConfig.getBrowserConfig(getOS(), getBrowser(), getRunOnSauce()),
    services: (getRunOnSauce() === 'true') ? ['sauce'] : ['devtools', ['selenium-standalone', {
        installArgs: {
            proxy: constants.PROXY,
            drivers: browserConfig.getDrivers(),
        },
        args: {
            drivers: browserConfig.getDrivers(),
        },
    }]],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    baseUrl: 'https://webdriver.io',
    waitforTimeout: 60000,
    framework: 'cucumber',
    reporters: [['cucumberjs-json', {
        jsonFolder: './reports/cucumber-json',
    }]],
    cucumberOpts: {
        requireModule: ['@babel/register'],
        require: ['./test/step_definitions/**/*.js'], // <string[]> (file/dir) require files before executing features
        backtrace: true, // <boolean> show full backtrace for errors
        compiler: [],
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: [],
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tagExpression: '@e1', // <string[]> (expression) only execute the features or scenarios with matching tag name
        timeout: 120000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
     before: function () {
        removeSync('./reports/cucumber-json/');
        removeSync('./reports/cucumber-html/');
        browser.setViewportSize({
            width: 1280,
            height: 578
        })
    },
    beforeFeature: async function (feature) {
        await databaseConfig.getDBConnection();
    },
    after: async function () {
        await databaseConfig.closeConnection(connection);
    }
};

if (getRunOnSauce() === 'true') {
    config.user = 'Sauce user name';
    config.key = 'Sauce access key';
    config.sauceConnect = false
}

exports.config = config;
