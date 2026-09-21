class CartPage {
    verifyProductInCart() {
      
      cy.get('.basket-container, .cart-icon').click({ force: true });
      cy.get('.basket-item, .cart-item').should('be.visible');
    }
  }
  
  export default new CartPage();