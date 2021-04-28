// Load all the default config:
const _ = require('lodash');
const defaults = require('./wdio.default.conf.js').config;

// 'e2' specific overrides:
const overrides = {
  baseUrl: 'https://qwww.americanexpress.com/en-us/account/cross-border/login?DestPage=https://cross-border-qa.americanexpress.com/home',
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
