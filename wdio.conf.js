const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const yargs = require('yargs');
const chai = require('chai');
const databaseConfig = require('./test/utils/database.Config');
const browserConfig = require('./test/utils/browser');
const constants = require('./test/constants/config_constants');

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
    baseUrl: 'http://localhost:8080',
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
    onPrepare: async () => {
        removeSync('./reports/cucumber-json/');
        removeSync('./reports/cucumber-html/');
    },
    before: async () => {
        global.assert = chai.assert;
        browser.setWindowSize(1920, 1080);
        if (browser.capabilities.browserName === 'chrome' && getRunOnSauce() === 'false') {
            browser.networkActivity = { http: [] };
            browser.cdp('Network', 'enable');
            browser.on('Network.responseReceived', (params) => {
                if (params.type.toLowerCase() === 'fetch') {
                    const values = { Response: { url: params.response.url, status: params.response.status, headers: params.response.headers } };
                    browser.networkActivity.http.push(values);
                }
            });
        }
        browser.setTimeout({ pageLoad: 30000 });
    },
    afterScenario: () => {
        browser.deleteCookies();
    },
    onComplete: async () => {
        generate(browserConfig.getReportOptions());
    },
};

if (getRunOnSauce() === 'true') {
    config.user = process.env.SAUCE_USERNAME || constants.SAUCE_USERNAME;
    config.key = process.env.SAUCE_ACCESS_KEY || getSauceKey();
    config.sauceConnect = true;
}

exports.config = config;
