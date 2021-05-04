import Page from './page';

const DRESSES_LINK ='//*[@id="block_top_menu"]/ul/li[2]/a';
const SEARCH_INPUT = '//*[@id="search_query_top"]';
const SEARCH = '//*[@id="searchbox"]/button';
const NO_SEARCH_RESULT = '//*[@id="center_column"]/p';
const SEARCH_LABEL = '//*[@id="center_column"]/h1';
const SEARCH_STRING = '//*[@id="center_column"]/h1/span[1]';
const SEARCH_DROPDOWN = '//*[@id="index"]/div[2]/ul/li';

class MyStoreHomePage extends Page {
  get dressesLink() { return $(DRESSES_LINK); }

  get searchInput() { return $(SEARCH_INPUT);}

  get searchButton() { return $(SEARCH);}

  get noSearchResult() { return $(NO_SEARCH_RESULT);}

  get searchLabel() { return $(SEARCH_LABEL);}

  get searchString() { return $(SEARCH_STRING);}

  get searchDropdown() { return $(SEARCH_DROPDOWN);}

  search(searchValue){
    this.searchInput.setValue(searchValue);
    this.searchButton.click();
  }

  searchAndSelect(searchValue){
    this.searchInput.setValue(searchValue);
    this.searchDropdown.click();
  }

  open() {
    super.open('');
  }
}

export default new MyStoreHomePage();
