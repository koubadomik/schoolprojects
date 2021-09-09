import * as SELECTORS from "../Utils/selectors";
import {CONSTANTS} from "../Utils/constants"
import PageObject from "./PageObject";

class ServerRegistrationPage extends PageObject {

    visit() {
        super.visit(CONSTANTS.URLS.SERVER_REGISTRATION)
    }

    chooseFirstType() {
        return this._selectFirst(SELECTORS.APP.SERVER_FORM.TYPE)
    }

    chooseTwoFactor() {
        return this._selectNthElement(SELECTORS.APP.SERVER_FORM.TWOFACTOR, 2)
    }


    getSubmitButton() {
        return cy.get(SELECTORS.APP.ADMIN_FORM.SUBMIT).eq(2);

    }

    isSubmitted() {
        return cy.url().should('include', CONSTANTS.URLS.SERVER_ACCESS)
    }
}

export default ServerRegistrationPage;