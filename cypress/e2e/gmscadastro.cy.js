///<reference types="cypress" />

describe('US-012 Funcionalidade: Cadastro de membros', () => {
  it('Deve cadastrar ampos obrigatorios', () => {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('#signup-firstname').type('João')
    cy.get('#signup-lastname').type('Silva')
    cy.get('#signup-email').type('teste2@teste.com')
    cy.get('#signup-phone').type('11999999999')
    cy.get('#signup-password').type('Testes@12345')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')
  })
})