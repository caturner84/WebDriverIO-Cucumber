import { attachImageToCucumberReport } from '../help.js';

const { After } = require('cucumber');

After((scenarioResult) => {
  if (scenarioResult.result.status === 'failed') {
    attachImageToCucumberReport();
  }
  return scenarioResult.result.status;
});
