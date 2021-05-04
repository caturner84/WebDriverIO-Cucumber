#!/usr/bin/env groovy
@Library('EnterpriseSharedLibrary@xlrCallback') _

def validEnvironmentList = ["e1", "e2", "fise1", "fise2"]
def validOsList = ["windows", "mac"]
def validBrowserList = ["chrome", "firefox", "ie", "edge", "safari", "allBrowsers"]
def validSuiteList = ["suite1", "suite2", ]
def utils = new com.aexp.jenkins.library.Utils()

timestamps {
    node('Suacelabs_Node') {

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

            sh(script:"npm install")
        }

        stage("tests") {
            try {
               successful = sh (script: "npm run test-jenkins-${ENVIRONMENT} -- ${testParams}", returnStatus: true) == 0
            } finally {
                publishHTML(target: [allowMissing: false, keepAll: true, reportDir: '' +
                        './reports/cucumber-html/',
                                     reportFiles : 'index.html', reportName: 'Tests Report'])
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
    if (SUITE_NAME == 'suite1' && successful == false) {
        currentBuild.result = 'FAILED'
        slack.notify("test-test-alerts", "integration tests unstable or failed.\n", "#C15757")
    } else if (SUITE_NAME == 'fisSierraConfigurationTests' && successful == false) {
        currentBuild.result = 'FAILED'
        slack.notify("test-test-alerts", " tests unstable or failed.\n", "#C15757")
    } else if (SUITE_NAME == 'createPaymentTests' && successful == false) {
        currentBuild.result = 'FAILED'
        mail to: 'xxx@xxx.com',
                subject: "Test Failure: ${currentBuild.fullDisplayName}",
                body: "Test Failure, click to view the failed build ${env.BUILD_URL}"
        slack.notify("test-test-alerts", "tests unstable or failed.\n","#C15757")
    }
}
