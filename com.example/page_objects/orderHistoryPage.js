import Page from './page';

const ORDER_HISTORY_HEADING = '//*[@id="center_column"]/h1';

class MyAccountPage extends Page {
  get orderHistoryHeading() { return $(ORDER_HISTORY_HEADING); }
}

export default new MyAccountPage();
