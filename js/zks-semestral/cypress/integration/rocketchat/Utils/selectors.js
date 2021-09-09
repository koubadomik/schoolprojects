export const APP = {
    ADMIN_FORM: {
        NAME: `input[placeholder='Type your name']`,
        USERNAME: `input[placeholder='Type your username']`,
        EMAIL: `input[placeholder='Type your email']`,
        PASSWORD: `input[placeholder='Type your password']`,
        SUBMIT: `[type='submit']`,
        HEADING: `#react-root > div header > h2`
    },
    ORGANIZATION_FORM: {
        HEADING: `form:nth-child(2) h2`,
        NAME: `#Organization_Name`,
        WEBPAGE: `#Website`,
        TYPE: `#Organization_Type`,
        FIELD: `#Industry`,
        SIZE: `#Size`,
        COUNTRY: `#Country`,
        PASSWORD: `.js-modal-input`,
        VERIFY: `.js-confirm`
    },
    LOGIN_FORM: {
        NAME: `[name=emailOrUsername]`,
        PASSWORD: `[name=pass]`,
        SUBMIT: `:nth-child(1) button`
    },
    SERVER_FORM: {
        TYPE: `#Server_Type`,
        TWOFACTOR: `#Accounts_TwoFactorAuthentication_By_Email_Auto_Opt_In`,
        ACCESS: `.SetupWizard__RegisterServerStep-option:nth-child(2)`,
        CONDITIONS: `a:nth-child(3)`,
        CONFIRMATION: `button`
    },
    OTHER: {
        TABLE: 'tbody tr',
        HOMEHEADING: 'span.rc-header__block'
    }
}