import { attachImageToCucumberReport } from 'cbp-test-common-utils';

const { After } = require('cucumber');

After((scenarioResult) => {
  if (scenarioResult.result.status === 'failed') {
    attachImageToCucumberReport();
  }
  return scenarioResult.result.status;
});
