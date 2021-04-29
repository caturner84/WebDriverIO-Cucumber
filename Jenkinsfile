#!/usr/bin/env groovy
@Library('EnterpriseSharedLibrary@xlrCallback') _

def validEnvironmentList = ["e1", "e2", "fise1", "fise2"]
def validOsList = ["windows", "mac"]
def validBrowserList = ["chrome", "firefox", "ie", "edge", "safari", "allBrowsers"]
def validSuiteList = ["createPaymentTests", "createPaymentIntegrationTests", "fisSierraConfigurationTests"]
def utils = new com.aexp.jenkins.library.Utils()

timestamps {
    node('Suacelabs_Node') { // real node is misspelled

        if (!validEnvironmentList.contains(ENVIRONMENT)) {
            println("ENVIRONMENT variable must be set to one of ${validEnvironmentList}")
            currentBuild.result = 'FAILED'
            return
        }
        if (!validOsList.contains(OS)) {
            println("OS variable must be set to one of ${validOsList}")
            currentBuild.result = 'FAILED'
            return
        }
        if (!validBrowserList.contains(BROWSER_NAME)) {
            println("BROWSER_NAME variable must be set to one of ${validBrowserList}")
            currentBuild.result = 'FAILED'
            return
        }

        List<String> jenkinsSuiteList = Arrays.asList(SUITE_NAME.split(" "))
        if (!jenkinsSuiteList.any { validSuiteList.contains(it) }) {
            println("SUITE_NAME variable must be set to one of ${validSuiteList}")
            currentBuild.result = 'FAILED'
            return
        }

        def testParams = " --environment=${ENVIRONMENT} --os=${OS} --browserName=${BROWSER_NAME} --threadCount=${THREAD_COUNT} --cucumberOpts.tagExpression=\"@${TAG}\" --suite ${SUITE_NAME}"

        stage("NPM Install") {
            scmCheckout {
                deleteWorkspace = 'false'
            }

            env.SASS_BINARY_SITE = 'https://ci-repo.aexp.com/nodejs/content/sites/npm-remotes/sass/node-sass/releases/download/'
            env.PHANTOMJS_CDNURL = 'https://ci-repo.aexp.com/nodejs/content/sites/npm-remotes/ariya/phantomjs/downloads/'
            env.NODEJS_ORG_MIRROR = 'https://ci-repo.aexp.com/nodejs/content/sites/npm-remotes/'

            sh(script:"npm install")
        }

        stage("test e2e tests") {
            try {
                // taken from enterprisesharedlibrary runSeleniumTestsOnSauceLabs.groovy - we need to apply the subdir workaround to its code
               /* sauce('69be7b54-c47d-4f08-a316-a6dac2ce28d0') {
                    sauceconnect(options: '--proxy phxappgwe2-vip.phx.aexp.com:9090 -vv --proxy-tunnel', sauceConnectPath: '', useGeneratedTunnelIdentifier: true, verboseLogging: true) {
                        successful = sh (script: "npm run test-jenkins-${ENVIRONMENT} -- ${testParams}", returnStatus: true) == 0
                    }
                } */
               successful = sh (script: "npm run test-jenkins-${ENVIRONMENT} -- ${testParams}", returnStatus: true) == 0
            } finally {
                publishHTML(target: [allowMissing: false, keepAll: true, reportDir: '' +
                        './reports/cucumber-html/',
                                     reportFiles : 'index.html', reportName: 'E2E Tests Report'])
                step([$class             : 'CucumberReportPublisher', fileIncludePattern: '*.json', jenkinsBasePath: '',
                      jsonReportDirectory: './reports/cucumber-json/']);
            }
        }
    }
}
checkpoint 'Slack Notify'
executeSlackNotify()
def response = utils.sendFeedbackToXLR()
println(" Response: ${response} ")

def executeSlackNotify() {
    println "Test suite - ${SUITE_NAME}"
    if (SUITE_NAME == 'createPaymentIntegrationTests' && successful == false) {
        currentBuild.result = 'FAILED'
        slack.notify("test-test-alerts", "Create payment integration tests unstable or failed.\n", "#C15757")
    } else if (SUITE_NAME == 'fisSierraConfigurationTests' && successful == false) {
        currentBuild.result = 'FAILED'
        slack.notify("test-test-alerts", "Fis Sierra configuration tests unstable or failed.\n", "#C15757")
    } else if (SUITE_NAME == 'createPaymentTests' && successful == false) {
        currentBuild.result = 'FAILED'
        mail to: 'Dave.Rawlinson@aexp.com',
                subject: "E2E Test Failure: ${currentBuild.fullDisplayName}",
                body: "End to End Test Failure, click to view the failed build ${env.BUILD_URL}"
        slack.notify("test-test-alerts", "E2E tests unstable or failed.\n","#C15757")
    }
}
