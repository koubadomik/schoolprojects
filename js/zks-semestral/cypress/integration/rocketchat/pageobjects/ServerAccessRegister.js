import * as SELECTORS from "../Utils/selectors";
import {CONSTANTS} from "../Utils/constants"
import PageObject from "./PageObject";

class ServerAccessRegister extends PageObject {

    visit() {
        super.visit(CONSTANTS.URLS.SERVER_ACCESS)
    }


    checkAccess() {
        return this._checkBox(SELECTORS.APP.SERVER_FORM.ACCESS)
    }

    checkConditions() {
        return this._checkBox(SELECTORS.APP.SERVER_FORM.CONDITIONS)
    }


    getSubmitButton() {
        return cy.get(SELECTORS.APP.ADMIN_FORM.SUBMIT).eq(3);

    }

    getConfirmationButton() {
        return cy.get(SELECTORS.APP.SERVER_FORM.CONFIRMATION);
    }

    isSubmitted() {
        return cy.url().should('include', CONSTANTS.URLS.REGISTRATION_FINAL)
    }
}

export default ServerAccessRegister;