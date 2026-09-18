/// <reference types="cypress" />

import Login from '../pages/Login';
import HomePage from '../pages/HomePage';

describe('GoIT Login ve Çıkış Testleri - Page Object Model', () => {
  
  const loginPage = new Login();
  const homePage = new HomePage();

  it('Birinci kullanıcı ile giriş ve çıkış testi', () => {
    loginPage.visit();
    loginPage.login('user888@gmail.com', '1234567890');
    cy.wait(5000);

    homePage.logout();

    
    cy.url().should('include', '/account/login');
  });

  it('İkinci kullanıcı ile giriş ve çıkış testi', () => {
    loginPage.visit();
    loginPage.login('testowyqa@qa.team', 'QA!automation-1');
    cy.wait(5000);

    homePage.logout();

    
    cy.url().should('include', '/account/login');
  });

});