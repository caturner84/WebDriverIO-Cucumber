var reportMetadataWindows = {
    device: 'Windows',
    platform: {
        name: 'windows',
        version: 'Windows 10'
    }
}

var reportMetadataMac = {
    device: 'MacBook Pro 15',
    platform: {
        name: 'OSX',
        version: '10.14'
    }
}

const browserConfig = {
    windows: {
        chrome: [{
            browserName: 'chrome',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        }],
        firefox: [{
            browserName: 'firefox',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        }],
        ie: [{
            browserName: 'internet explorer',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        }],
        edge: [{
            browserName: 'MicrosoftEdge',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        }],
    },
    mac: {
        chrome: [{
            browserName: 'chrome',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        }],
        firefox: [{
            browserName: 'firefox',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        }],
        safari: [{
            browserName: 'safari',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        }],
    },
    all: [
        {
            browserName: 'chrome',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        },
        {
            browserName: 'firefox',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        },
        {
            browserName: 'internet explorer',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        },
        {
            browserName: 'MicrosoftEdge',
            platform: 'windows 10',
            metadata: reportMetadataWindows
        },
        {
            browserName: 'chrome',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        },
        {
            browserName: 'firefox',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        },
        {
            browserName: 'safari',
            platform: 'macOS 10.14',
            metadata: reportMetadataMac
        }
    ]
};

module.exports.getBrowserConfig = function (os, browserName) {
    if ('all' === browserName) {
        return browserConfig[browserName];
    }
    return browserConfig[os][browserName];
}

module.exports.getServices = (runOnSauce) => {
    if ('true' === runOnSauce) {
        return ['sauce'];
    } else {
        return ['selenium-standalone', 'sauce'];
    }
}

module.exports.getDrivers = () => ({
chrome: {
version: '89.0.4389.23',
},
})