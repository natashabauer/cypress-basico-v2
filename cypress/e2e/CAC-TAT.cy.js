/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {

    cy.visit('file:///C:/Users/NatashaBauer/CursoCypress/cypress-basico-v2/src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  })
});
