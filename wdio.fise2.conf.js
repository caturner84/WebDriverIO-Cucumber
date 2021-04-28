// Load all the default config:
const _ = require('lodash');
const defaults = require('./wdio.default.conf.js').config;

// 'e2' specific overrides:
const overrides = {
  baseUrl: 'https://amexcbp-pp.avantgardportal.com/sierra/sierra/index2.htm',
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
