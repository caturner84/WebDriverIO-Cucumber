// Load all the default config:
const _ = require('lodash');
const defaults = require('./wdio.default.conf.js').config;

// 'e1' specific overrides:
const overrides = {
  baseUrl: 'https://one-dev.americanexpress.com/en-us/account/cross-border/login?DestPage=https://cross-border-dev.americanexpress.com/home',
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
