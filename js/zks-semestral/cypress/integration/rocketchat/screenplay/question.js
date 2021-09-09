import {createQuestion} from "cypress-screenplay";
import * as SELECTORS from "../Utils/selectors";

export const properPageHeading = createQuestion((cy, param, assert) => {
    cy.get(SELECTORS.APP.ORGANIZATION_FORM.HEADING)
        .should($h2 => {
            assert($h2)
        })
});

export const userListLength = createQuestion((cy, param, assert) => {
    cy.get(SELECTORS.APP.OTHER.TABLE)
        .should($table => {
            assert($table)
        })
});

export const roomListLength = createQuestion((cy, param, assert) => {
    cy.get(SELECTORS.APP.OTHER.TABLE)
        .should($table => {
            assert($table)
        })
});

export const seeMainPage = createQuestion((cy, param, assert) => {
    cy.get(SELECTORS.APP.OTHER.HOMEHEADING)
        .should($table => {
            assert($table)
        })
});