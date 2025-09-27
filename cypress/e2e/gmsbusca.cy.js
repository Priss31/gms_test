
//***PRECISEI INVERTER A PORTA DO BANCO COM A DO FRONT PARA PODER RODAR NA MINHA MÁQUINA */

/// <reference types="cypress" />

describe('US-001 Funcionalidade: Busca Filmes', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/');
  });

  it('CT 01 - Deve realizar busca com termo válido e encontrar resultados', () => {
    const termoBusca = 'Matrix';
    cy.get('#search-input')
      .type(termoBusca)
      .should('have.value', termoBusca);
    cy.get('#search-button')
      .click()
      .should('be.enabled');
    cy.wait(2000);
    cy.get('#results-section')
      .should('be.visible')
      .and('contain', termoBusca);
  });

  it('CT 02 - Deve exibir mensagem quando não houver resultados', () => {
    const termoBusca = 'TermoInexistente123';
    
    cy.get('#search-input').type(termoBusca);
    cy.get('#search-button').click();
    cy.wait(2000);
    
    cy.get('#results-section')
      .should('be.visible')
      .and('contain', 'Filme não encontrado.');
  });

  it('CT 03 - Não deve realizar busca com campo vazio', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Por favor, digite o nome de um filme');
    });
    
    cy.get('#search-button').click();
  });

  it('CT 04- Deve limpar a busca', () => {
  cy.get('#search-input').type('Teste');
  cy.get('#clear-button').click();
  cy.get('#search-input').should('be.empty');
});
});