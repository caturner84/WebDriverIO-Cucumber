import Page from './page';

const PRODUCT = '//img[@title=\'Faded Short Sleeve T-shirts\']';
const IN_STOCK = '//span[text()=\'In stock\']';
const ADD_TO_CART = '//span[text()=\'Add to cart\']';
const PROCEED_TO_CHECKOUT = '//span[contains(text(),\'Proceed to checkout\')]';

class SearchResultsPage extends Page {
  get product() { return $(PRODUCT); }

  get inStock() { return $(IN_STOCK); }

  get addToCart() { return $(ADD_TO_CART); }

  get proceedToCheckout() { return $(PROCEED_TO_CHECKOUT); }
}

export default new SearchResultsPage();
