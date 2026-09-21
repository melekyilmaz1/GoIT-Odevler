class ProductDetailPage {
    selectSizeAndAddToCart() {
      
      cy.get('.variant-piece, .size-item, option').first().click({ force: true });
      
      cy.get('.add-to-cart, .basket-button, button[class*="basket"]').click({ force: true });
    }
  }
  
  export default new ProductDetailPage();