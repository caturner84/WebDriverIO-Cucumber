const constants = require('../constants/configConstants');

const reportMetadataWindows = {
  device: constants.WINDOWS,
  platform: {
    name: constants.WINDOWS,
    version: constants.WINDOWS_10,
  },
};

const reportMetadataMac = {
  device: constants.MAC,
  platform: {
    name: constants.OSX,
    version: constants.MAC_10_14,
  },
};

const localWindowsChrome = {
  browserName: constants.CHROME,
//  'cjson:metadata': reportMetadataWindows,
//  'goog:chromeOptions': {
//    args: ['--headless', '--disable-gpu', '--lang=en-US'],
//  },
};

const localWindowsFF = {
  browserName: constants.FIREFOX,
  'cjson:metadata': reportMetadataWindows,
};
const localWindowsIE = {
  browserName: constants.IE,
};

const localWindowsEdge = {
  browserName: constants.EDGE,
  'cjson:metadata': reportMetadataWindows,
};

const localMacChrome = {
  browserName: constants.CHROME,
  'cjson:metadata': reportMetadataMac,
};

const localMacFF = {
  browserName: constants.FIREFOX,
  'cjson:metadata': reportMetadataMac,
};

const localMacSafari = {
  browserName: constants.SAFARI,
  'cjson:metadata': reportMetadataMac,
};

const sauceWindowsChrome = {
  browserName: constants.CHROME,
  platformName: constants.WINDOWS_10,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: '3.141.59',
    name: constants.CHROME_WINDOWS_TESTNAME,
  },
  'cjson:metadata': reportMetadataWindows,
};

const sauceWindowsFF = {
  browserName: constants.FIREFOX,
  platformName: constants.WINDOWS_10,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    name: constants.FF_WINDOWS_TESTNAME,
  },
  'cjson:metadata': reportMetadataWindows,
};

const sauceWindowsIE = {
  browserName: constants.IE,
  platformName: constants.WINDOWS_10,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    iedriverVersion: '3.141.59',
    name: constants.IE_WINDOWS_TESTNAME,
  },
};

const sauceWindowsEdge = {
  browserName: constants.EDGE,
  platformName: constants.WINDOWS_10,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    name: constants.EDGE_WINDOWS_TESTNAME,
  },
  'cjson:metadata': reportMetadataWindows,
};

const sauceMacChrome = {
  browserName: constants.CHROME,
  platformName: constants.MAC,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    name: constants.CHROME_MAC_TESTNAME,
  },
  'cjson:metadata': reportMetadataMac,
};

const sauceMacFF = {
  browserName: constants.FIREFOX,
  platformName: constants.MAC,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    name: constants.FF_MAC_TESTNAME,
  },
  'cjson:metadata': reportMetadataMac,
};

const sauceMacSafari = {
  browserName: constants.SAFARI,
  platformName: constants.MAC,
  browserVersion: 'latest',
  'sauce:options': {
    seleniumVersion: constants.SELENIUM_VERSION,
    name: constants.SAFARI_MAC_TESTNAME,
  },
  'cjson:metadata': reportMetadataMac,
};

const localBrowserConfig = {
  windows: {
    chrome: [localWindowsChrome],
    firefox: [localWindowsFF],
    ie: [localWindowsIE],
    edge: [localWindowsEdge],
  },
  mac: {
    chrome: [localMacChrome],
    firefox: [localMacFF],
    safari: [localMacSafari],
  },
  all: [
    localWindowsChrome,
    localWindowsFF,
    localWindowsIE,
    localWindowsEdge,
    localMacChrome,
    localMacFF,
    localMacSafari,
  ],
};

const sauceBrowserConfig = {
  windows: {
    chrome: [sauceWindowsChrome],
    firefox: [sauceWindowsFF],
    ie: [sauceWindowsIE],
    edge: [sauceWindowsEdge],
  },
  mac: {
    chrome: [sauceMacChrome],
    firefox: [sauceMacFF],
    safari: [sauceMacSafari],
  },
  all: [
    sauceWindowsChrome,
    sauceWindowsFF,
    sauceWindowsIE,
    sauceWindowsEdge,
    sauceMacChrome,
    sauceMacFF,
    sauceMacSafari,
  ],
};

module.exports.getBrowserConfig = (os, browserName, runOnSauce) => {
  if (browserName === constants.ALL_BROWSERS) {
    return (runOnSauce === 'true') ? sauceBrowserConfig[browserName] : localBrowserConfig[browserName];
  }
  return (runOnSauce === 'true') ? sauceBrowserConfig[os][browserName] : localBrowserConfig[os][browserName];
};

module.exports.getDrivers = () => ({
  chrome: '',
  ie: '',
  edge: '',
});

module.exports.getReportOptions = () => ({
  jsonDir: './reports/cucumber-json/',
  reportPath: './reports/cucumber-html/',
  openReportInBrowser: true,
  disableLog: true,
  pageTitle: 'automation-practise-test-report',
  reportName: 'automation-practise-test-report',
  displayDuration: true,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Environment', value: 'environment' },
      { label: 'Project', value: 'webdriverio-cucumber' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'Sprint 0' },
    ],
  },
  customStyle: './com.example/utils/customStyle.css',
  pageFooter: '<div style="margin:0 auto;width:50%;padding:10px;">'
    + '<p>This is an example report</p></div>',
});
