const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const yargs = require('yargs');
const chai = require('chai');
const browserConfig = require('./com.example/utils/browser');
const constants = require('./com.example/constants/configConstants');

const parseCmdArgs = () => yargs.argv;
const getCmdArgs = () => parseCmdArgs();
const getRunOnSauce = () => getCmdArgs()[constants.RUNONSAUCE] || false;
const getBrowser = () => getCmdArgs()[constants.BROWSERNAME] || constants.CHROME;
const getOS = () => getCmdArgs()[constants.OS] || constants.WINDOWS;
const getThreadCount = () => getCmdArgs()[constants.THREADCOUNT] || 1;

const config = {
  specs: ['./com.example/features/**/*.feature'],
  suites: {
    exampleTests: [
      './com.example/features/productSearch.feature',
      './com.example/features/myAccount.feature',
      './com.example/features/checkout.feature',
    ],
  },
  exclude: [],
  specFileRetries: 1,
  runner: 'local',
  maxInstances: getThreadCount(),
  capabilities: browserConfig.getBrowserConfig(getOS(), getBrowser(), getRunOnSauce()),
  services: (getRunOnSauce() === 'true') ? ['sauce'] : ['selenium-standalone'],
  seleniumInstallArgs: {
    proxy: constants.PROXY,
    drivers: browserConfig.getDrivers(),
  },
  seleniumArgs: {
    drivers: browserConfig.getDrivers(),
  },
  skipSeleniumInstall: false,
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  baseUrl: 'http://localhost:8080',
  waitforTimeout: 50000,
  connectionRetryTimeout: 50000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [['cucumberjs-json', {
    jsonFolder: './reports/cucumber-json',
  }]],

  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./com.example/**/*.js'], // <string[]> (file/dir) require files before executing features
    backtrace: false, // <boolean> show full backtrace for errors
    compiler: [],
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: [],
    colors: true, // <boolean> disable colors in formatter output
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: false, // <boolean> fail if there are any undefined or pending steps
    tagExpression: '@example', // <string[]> (expression) only execute the features or scenarios with matching tag name
    timeout: 30000, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  onPrepare: () => {
    removeSync('./reports/cucumber-json/');
    removeSync('./reports/cucumber-html/');
  },
  before: async () => {
    global.assert = chai.assert;
    // browser.setWindowSize(2520, 1080);
    browser.maximizeWindow();
    browser.setTimeout({ pageLoad: 30000 });
  },
  afterScenario: () => {
    browser.deleteCookies();
  },
  onComplete: () => {
    generate(browserConfig.getReportOptions());
  },
};

if (getRunOnSauce() === 'true') {
  config.user = process.env.SAUCE_USERNAME || constants.SAUCE_USERNAME;
  config.key = process.env.SAUCE_ACCESS_KEY || constants.SAUCE_ACCESS_KEY;
  config.sauceConnect = false;
}

exports.config = config;
