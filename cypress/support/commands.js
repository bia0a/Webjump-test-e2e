Cypress.Commands.add('login', (credentialsKey = 'login') => {
    cy.fixture('credentials.json').then((credentials) => {
        const { email, password } = credentials[credentialsKey];
        cy.get('#email').type(email);
        cy.get('#pass').type(password);
        cy.get('#send2').click()
        cy.url().should('include', 'customer/account/');
    });
});

Cypress.Commands.add('registerUser', (credentialsKey = 'checkout') => {
    cy.fixture('credentials.json').then((credentials) => {
        const { email, password } = credentials[credentialsKey];
        cy.get('#firstname').type('test');
        cy.get('#lastname').type('user Webjump');
        cy.get('#email_address').type(email);
        cy.get('#password').type(password, { sensitive: true });
        cy.get('#password-strength-meter').should('contain.text', 'Very Strong');
        cy.get('#password-confirmation').type(password, { sensitive: true });
        cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click();
        cy.url().should('include', 'customer/account/');
    });
});

Cypress.Commands.add('addItemToCartAndShipping', () => {
    cy.get('.swatch-opt-1564 > .size > .swatch-attribute-options > #option-label-size-157-item-172').click();
    cy.get('.swatch-opt-1564 > .swatch-attribute.color > .swatch-attribute-options > #option-label-color-93-item-57').click();
    cy.get('button.action.tocart.primary').first().invoke('show').click({ force: true });
    cy.get('.message-success > div > a').should('exist').click();
    cy.url().should('include', '/checkout/cart/');
    cy.intercept('GET', 'https://magento2-demo.magebit.com/static/version1597384256/frontend/Magento/luma/en_US/Magento_Tax/template/checkout/shipping_method/price.html').as('customerTotal');
    cy.wait('@customerTotal').then(() => {
        cy.get('strong > .price').should('be.visible');
        cy.get('li.item button.action.primary.checkout').click({ force: true });
        cy.url().should('include', '/checkout/#shipping');
    });
});

Cypress.Commands.add('completeCheckoutProcess', () => {
    cy.get('#customer-email').type('fakeemail@gmail.com');
    cy.intercept('POST', 'https://magento2-demo.magebit.com/rest/default/V1/customers/isEmailAvailable').as('customerEmail');
    cy.wait('@customerEmail');
    cy.get('[name="shippingAddress.firstname"]').type('customer');
    cy.get('[name="shippingAddress.lastname"]').type('fake');
    cy.get('.street > :nth-child(2) > :nth-child(1)').type('fake location');
    cy.get('[name="shippingAddress.country_id"] select').select('United States', { force: true });
    cy.get('[name="shippingAddress.region_id"] select').select('Florida', { force: true });
    cy.get('[name="shippingAddress.city"]').type('Tallahassee');
    cy.get('[name="shippingAddress.postcode"]').type('3230132013');
    cy.get('[name="shippingAddress.telephone"]').type('1234567890');
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
    cy.get('.button').click();
    cy.get('#billing-address-same-as-shipping-checkmo').click();
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
    cy.url().should('include', 'https://magento2-demo.magebit.com/checkout/onepage/success/');
    cy.get('.base').should('have.text', 'Thank you for your purchase!');
});
