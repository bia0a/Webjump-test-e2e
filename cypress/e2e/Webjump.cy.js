describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('https://magento2-demo.magebit.com/customer/account/create/');
  });
  it('should register a new user', () => {
    cy.registerUser();
  })
}),
  describe('Login', () => {
    beforeEach(() => {
      cy.visit('https://magento2-demo.magebit.com/customer/account/login/');
    });
    it('should log in with valid credentials', () => {
      cy.login();
    });
  }),
  describe('Add Product to Cart and Checkout', () => {
    beforeEach(() => {
      cy.visit('https://magento2-demo.magebit.com/');
    });
    it('should add a product to the cart and complete checkout', () => {
      cy.addItemToCartAndShipping();
      cy.completeCheckoutProcess();
    })
  })