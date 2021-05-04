import Page from './page';

const SHOPPING_CART_HEADING = '//*[@id="center_column"]/h1';
const PROCEED_TO_CHECKOUT = '//*[@id=\'HOOK_SHOPPING_CART\']/following::span[contains(text(),\'Proceed to checkout\')]';
const TERMS_OF_SERVICE_CHECKBOX = '#uniform-cgv';
const PAYMENT_OPTION_WIRE = '//*[@title="Pay by bank wire"]';
const CONFIRM_ORDER = '//span[contains(text(),\'I confirm my order\')]';
const BACK_TO_ORDERS = '//*[text()=\'Back to orders\']';

class MyAccountPage extends Page {
  get shoppingCartHeading() { return $(SHOPPING_CART_HEADING); }

  get proceedToCheckout() { return $(PROCEED_TO_CHECKOUT); }

  get termsOfServiceCheckbox() { return $(TERMS_OF_SERVICE_CHECKBOX); }

  get paymentOptionWire() { return $(PAYMENT_OPTION_WIRE); }

  get confirmOrder() { return $(CONFIRM_ORDER); }

  get backToOrders() { return $(BACK_TO_ORDERS); }
}

export default new MyAccountPage();
