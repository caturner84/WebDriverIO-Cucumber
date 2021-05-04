import Page from './page';

const UPDATE_BUTTON = '//span[text()=\'Update\']';
const CITY_INPUT = '#city';

class MyAddressesPage extends Page {
  get updateButton() { return $(UPDATE_BUTTON); }

  get cityInput() { return $(CITY_INPUT); }
}

export default new MyAddressesPage();
