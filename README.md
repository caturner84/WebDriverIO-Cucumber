# cbp-e2e-tests

# End to End Tests
WebDriverIO with Cucumber framework for Global Payments end to end tests and FIS Sierra configuration tests. All code committed to this repository must be approved by at least 2 QE's. 

## Installation
```bash
git clone https://stash.aexp.com/stash/scm/aim600000190/cbp-e2e-tests.git
npm install
```

## Usage
After cloning, installing, and building as described above, e2e tests can be run as follows:
`Run tests on local browser using below command`
```bash

npm run test-local-e1 -- --browserName=safari --os=mac --threadCount=1 --cucumberOpts.tagExpression="@e1" --environment=e1
```

`Run tests on SauceLabs browser from local using below command`

```bash
npm run test-local-e1 -- --browserName=safari --os=mac --threadCount=1 --cucumberOpts.tagExpression="@e1" --environment=e1 --runOnSauce=true --sauceAccessKey=secretKey
```

`Please refer package.json to run different test suites and environemnts.`

## Command line arguments

###### browserName 
*chrome, firefox, ie, edge, safari, servicingPortalBrowsers, allBrowsers*
`allBrowsers command runs tests in all the browsers in windows and mac`

###### os 
*windows, mac*

###### runOnSauce 
*true (Tests will be executed in SauceLabs), false (Tests will be executed on your local machine)*

###### threadCount
1 or more (Tests will be executed in parallel based on the threadCount provided)

###### sauceAccessKey
Provide sauceAccessKey parameter while running tests in SauceLabs from local machine, No need to to pass this 
parameter if tests are running on local machine browsers. This is defaulted while running tests in jenkins

###### environment
*e1, e2*    

## Jenkins    
Jenkins jobs are configured and integrated to CICD to run these tests 
    
`To run CAP page integration tests`

    https://ci.aexp.com/mup/job/600000190/job/create-payment-integration-tests/

`To run CBP e2e tests`

    https://ci.aexp.com/mup/job/600000190/job/cbp-e2e-tests/
    
## Configuration

### Environment configuration
Add an environment specific wdio.default.conf.js file and override the default configuration e.g. wdio.e1.conf.js.
To run with the environment overrides, add a new script in package.json e.g. "test-e1".

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

##cbp-test-common-utils
This repository uses the cbp-test-common-utils package for page elements of different components that make up the create payment page,
it also contains reusable functions for each component. 
For more information see https://stash.aexp.com/stash/projects/AIM600000190/repos/cbp-test-common-utils/browse
