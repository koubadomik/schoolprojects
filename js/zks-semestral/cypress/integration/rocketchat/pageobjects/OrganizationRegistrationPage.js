import * as SELECTORS from "../Utils/selectors";
import {CONSTANTS} from "../Utils/constants"
import PageObject from "./PageObject";

class OrganizationRegistrationPage extends PageObject {

    visit() {
        super.visit(CONSTANTS.URLS.ORGANIZATION_REGISTRATION)
    }

    fillName(name) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ORGANIZATION_FORM.NAME, name)
    }

    fillWebPage(page) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ORGANIZATION_FORM.WEBPAGE, page)
    }

    fillPassword(password) {
        return this._fillBasicFieldBySelector(SELECTORS.APP.ORGANIZATION_FORM.PASSWORD, password)
    }

    chooseFirstType() {
        return this._selectFirst(SELECTORS.APP.ORGANIZATION_FORM.TYPE)
    }

    chooseFirstField() {
        return this._selectFirst(SELECTORS.APP.ORGANIZATION_FORM.FIELD)
    }

    chooseFirstSize() {
        return this._selectFirst(SELECTORS.APP.ORGANIZATION_FORM.SIZE)
    }

    chooseFirstCountry() {
        return this._selectFirst(SELECTORS.APP.ORGANIZATION_FORM.COUNTRY)
    }

    getSubmitButton() {
        return cy.get(SELECTORS.APP.ADMIN_FORM.SUBMIT).eq(1);

    }

    isSubmitted() {
        return cy.url().should('include', CONSTANTS.URLS.SERVER_REGISTRATION)
    }
}

export default OrganizationRegistrationPage;