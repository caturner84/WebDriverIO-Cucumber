## Installation
```bash
git clone https://github.com/caturner84/WebDriverIO-Cucumber.git
npm install
```

## Usage
After cloning, installing, and building as described above, tests can be run as follows:
`Run tests on local browser using below command`
```bash

npm run test-local-example -- --browserName=chrome --threadCount=2 --cucumberOpts.tagExpression="@example"
```

`Please refer package.json to run different test suites and environemnts.`

## Command line arguments

###### browserName 
*chrome, firefox, ie, edge, safari, servicingPortalBrowsers, allBrowsers*
`allBrowsers command runs tests in all the browsers in windows and mac`

###### os 
*windows, mac*

###### threadCount
1 or more (Tests will be executed in parallel based on the threadCount provided)

### Cucumber options
All available cucumber options can be found under "cucumberOpts:" in "wdio.default.conf.js" file including cucumber tags.

### Cucumber report options
All available cucumber report options can be found under "reporterOptions:" in "wdio.default.conf.js" file.
To open the reports navigate to ./reports/cucumber-html/index.html
Once the report is open, click on feature name link to navigate to specific feature file report with all the scenarios and screenshots

### gherkin-linting
All feature files have to follow the same standards and therefore gherkin-linting has been applied by default.
It is the responsibility of the quality engineer to ensure that linting rules have been followed.
Gherkin-linting results can be found in reports/gherkin-lint-results.

### more info
More info on WebDriverIo https://webdriver.io/docs/gettingstarted
Test site used for project http://automationpractice.com/index.php
