import * as SELECTORS from "../Utils/selectors";
import {CONSTANTS} from "../Utils/constants"
import PageObject from "./PageObject";

class AdminRegistrationPage extends PageObject {

    visit() {
        super.visit(CONSTANTS.URLS.ADMIN_REGISTRATION)
    }

    fillName(name) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ADMIN_FORM.NAME, name)
    }

    fillUsername(username) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ADMIN_FORM.USERNAME, username)
    }

    fillEmail(email) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ADMIN_FORM.EMAIL, email)
    }

    fillPassword(password) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ADMIN_FORM.PASSWORD, password)
    }

    getSubmitButton() {
        return cy.get(SELECTORS.APP.ADMIN_FORM.SUBMIT).first();

    }

    isSubmitted() {
        return cy.url().should('include', CONSTANTS.URLS.ORGANIZATION_REGISTRATION)
    }
}

export default AdminRegistrationPage;