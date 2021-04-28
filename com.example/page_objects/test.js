import Page from './page';

class WebdriverIoHomePage extends Page {
    open() {
        super.open('');
    }
}

export default new WebdriverIoHomePage();