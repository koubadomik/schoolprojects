class PageObject {

    visit(page) {
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
    }

    _fillField(field, value) {
        field.clear();
        field.type(value);
    }

    _fillBasicFieldBySelector(selector, value) {
        if (value.length < 1) return this
        const field = cy.get(selector);
        this._fillField(field, value)
        return this;
    }

    _selectNthElement(selector, n) {
        cy.wait(3000)
        cy.get(selector).click()
        cy.get(".rcx-tile .rcx-tile:nth-child(1) li:nth-child(" + n + ")").click()
        return this
    }

    _selectFirst(selector) {
        return this._selectNthElement(selector, 1)
    }

    _checkBox(selector) {
        cy.get(selector).click("left").click()
        return this;
    }

}

export default PageObject;