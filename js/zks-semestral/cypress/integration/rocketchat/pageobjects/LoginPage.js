import PageObject from "./PageObject";
import * as SELECTORS from "../Utils/selectors";
import {CONSTANTS} from "../Utils/constants"

class LoginPage extends PageObject {

    visit() {
        super.visit(CONSTANTS.URLS.LOGIN)
    }

    fillName(name) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.LOGIN_FORM.NAME, name)
    }

    fillPassword(password) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.LOGIN_FORM.PASSWORD, password)
    }

    getSubmitButton() {
        return cy.get(SELECTORS.APP.LOGIN_FORM.SUBMIT).first();

    }
}

export default LoginPage;