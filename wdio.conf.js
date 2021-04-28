const browserConfig = require('./test/utils/browser');
const databaseConfig = require('./test/utils/database.config');
const yargs = require('yargs');
const chai = require('chai');

const parseCmdArgs = () => yargs.argv;
const getCmdArgs = () => parseCmdArgs();
const getRunOnSauce = () => getCmdArgs()['runOnSauce'] || false;
const getBrowser = () => getCmdArgs()['browserName'] || 'chrome';
const getOs = () => getCmdArgs()['os'] || 'windows';
const getThreadCount = () => getCmdArgs()['threadCount'] || 1;

const config = {
    specs: [
        './test/features/**/*.feature'
    ],
    exclude: [],
    specFileRetries: 1,
    maxInstances: getThreadCount(),
    capabilities: browserConfig.getBrowserConfig(getOs(), getBrowser(), getRunOnSauce()),
    services: (getRunOnSauce() === 'true') ? ['sauce'] : ['selenium-standalone', {
    installArgs: {
        drivers: browserConfig.getDrivers(),
        },
    args: {
        driver: browserConfig.getDrivers(),
        },
    }],
    skipSeleniumInstall: false,
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'https://webdriver.io',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [['cucumberjs-json', {
        jsonFolder: './reports/cucumber-json',
        }]],
    cucumberOpts: {
        requireModule: ['@babel/register'],
        require: ['./test/step_definitions/**/*.js'],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: [], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source URIs
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tagExpression: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 70000,      // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
    before: function () {
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

if ('true' === getRunOnSauce()) {
    config.user = 'Sauce user name';
    config.key = 'Sauce access key';
    config.sauceConnect = false
}

exports.config = config;
