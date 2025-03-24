// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cria um comando customizado chamado "fillMandatoryFieldsAndSubmit()"
// que preenche os campos obrigatórios e submete o formulário com sucesso (sem erros)
/*primeira opção
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data) => {
  
  cy.get("#firstName").type("Tiago");
  cy.get("#lastName").type("Reis");
  cy.get("#email").type("tiago7@my.com");
  cy.get("#open-text-area").type("Teste.");
  cy.get('button[type="submit"]').click();
  */

//segunda opção que recebe uma variável data com os valores a serem preenchidos nos campos obrigatórios do formulário
//e preenche os campos obrigatórios e submete o formulário com sucesso (sem erros)
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data) => {
  cy.get("#firstName").type(data.firstName);
  cy.get("#lastName").type(data.lastName);
  cy.get("#email").type(data.email);
  cy.get("#open-text-area").type(data.text);
  cy.get('button[type="submit"]').click();
});
