import {createTask} from "cypress-screenplay";
import * as SELECTORS from "../Utils/selectors";

export const visitPage = createTask((cy, page) => {
    cy.visit(page, {
        onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', {value: 'en-EN'});
            Object.defineProperty(win.navigator, 'languages', {value: ['en']});
            Object.defineProperty(win.navigator, 'accept_languages', {value: ['en']});
        },
        headers: {
            'Accept-Language': 'en',
        },
    });
});

export const login = createTask((cy, params) => {
    const username = params[0]
    const password = params[1]

    const usernameField = cy.get(SELECTORS.APP.LOGIN_FORM.NAME)
    usernameField.clear();
    usernameField.type(username);

    const passwordField = cy.get(SELECTORS.APP.LOGIN_FORM.PASSWORD)
    passwordField.clear();
    passwordField.type(password);

    cy.get(SELECTORS.APP.LOGIN_FORM.SUBMIT).first().click()

});