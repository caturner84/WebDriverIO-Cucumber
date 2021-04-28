// Load all the default config:
const _ = require('lodash');
const defaults = require('./wdio.default.conf.js').config;

// 'e1' specific overrides:
const overrides = {
  baseUrl: 'https://webdriver.io/docs/frameworks/',
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
