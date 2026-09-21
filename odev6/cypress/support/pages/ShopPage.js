class ShopPage {
    visit() {
      cy.visit('https://www.esrahelvaci.com/yeni-sezon-kadin-giyim', {
        failOnStatusCode: false,
      });
    }
  
    selectRandomProduct() {
      
      cy.get('.product-item, .col-item, .product-card').its('length').then((count) => {
        const randomIndex = Math.floor(Math.random() * Math.min(count, 4));
        cy.get('.product-item, .col-item, .product-card').eq(randomIndex).click();
      });
    }
  }
  
  export default new ShopPage();