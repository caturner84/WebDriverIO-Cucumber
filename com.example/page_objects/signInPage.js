import Page from './page';

const SIGN_IN_LINK = '//*[@class="login"]';
const EMAIL_INPUT = '#email';
const PASSWORD_INPUT = '#passwd';
const SIGN_IN_BUTTON = '#SubmitLogin';

const MY_ACCOUNT_HEADING = '//*[@id="center_column"]/h1';

class SignInPage extends Page {
  get signInLink() { return $(SIGN_IN_LINK); }

  get emailInput() { return $(EMAIL_INPUT); }

  get passwordInput() { return $(PASSWORD_INPUT); }

  get signInButton() { return $(SIGN_IN_BUTTON); }

  get myAccountHeading() { return $(MY_ACCOUNT_HEADING); }

  signIn(email, password){
    this.emailInput.waitForExist(30000);
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
    this.signInButton.click();
  }
}

export default new SignInPage();
