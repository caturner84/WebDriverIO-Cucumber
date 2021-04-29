import { attachImageToCucumberReport } from '../help';

const { After } = require('cucumber');

After((scenarioResult) => {
  if (scenarioResult.result.status === 'failed') {
    attachImageToCucumberReport();
  }
  return scenarioResult.result.status;
});
