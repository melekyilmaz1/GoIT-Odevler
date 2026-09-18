class Login {
    // Element seçicileri
    get emailInput() {
      return cy.get('input[type="email"], input[name="email"]');
    }
  
    get passwordInput() {
      return cy.get('input[type="password"], input[name="password"]');
    }
  
    get submitButton() {
      return cy.get('button[type="submit"], button:contains("Log in")');
    }
  
    
    visit() {
      cy.visit('https://www.edu.goit.global/account/login');
    }
  
    
    login(email, password) {
      this.emailInput.type(email);
      this.passwordInput.type(password);
      this.submitButton.click();
    }
  }
  
  
  export default Login;