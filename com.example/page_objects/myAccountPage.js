import Page from './page';

const MY_XXX_HEADING = '//*[@id="center_column"]/h1';
const MY_PERSONAL_INFORMATION_BUTTON = '//span[text()=\'My personal information\']';
const MY_ADDRESSES_BUTTON = '//span[text()=\'My addresses\']';
const FIRST_NAME = '#firstname';
const OLD_PASSWORD = '#old_passwd';
const NEW_PASSWORD = '#passwd';
const CONFIRM_PASSWORD = '#confirmation';
const SAVE_BUTTON = '//span[contains(text(),\'Save\')]';
const UPDATE_MESSAGE = '//p[contains(text(),\'Your personal information has been successfully updated.\')]';

class MyAccountPage extends Page {
  get myHeading() { return $(MY_XXX_HEADING); }

  get myPersonalInfoButton() { return $(MY_PERSONAL_INFORMATION_BUTTON); }

  get myAddressesButton() { return $(MY_ADDRESSES_BUTTON); }

  get firstName() { return $(FIRST_NAME); }

  get oldPassword() { return $(OLD_PASSWORD); }

  get newPassword() { return $(NEW_PASSWORD); }

  get confirmPassword() { return $(CONFIRM_PASSWORD); }

  get saveButton() { return $(SAVE_BUTTON); }

  get updateMessage() { return $(UPDATE_MESSAGE); }
}

export default new MyAccountPage();
