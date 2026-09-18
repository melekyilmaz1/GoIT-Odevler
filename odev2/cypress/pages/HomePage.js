class HomePage {
    
    get menuButton() {
      return cy.get('#open-navigation-menu-mobile');
    }
  
    get logoutButton() {
      return cy.get(':nth-child(9) > .next-1f1d9nl');
    }
  
   
    logout() {
      this.menuButton.click();
      cy.wait(5000); 
      this.logoutButton.click();
    }
  }
  
  export default HomePage;