// Load all the default config:
const _ = require('lodash');
const defaults = require('./wdio.default.conf.js').config;

// apply specific overrides to values used in the default config:
const overrides = {
  baseUrl: 'http://automationpractice.com/index.php',
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
