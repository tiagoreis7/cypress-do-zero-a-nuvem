it("testa a página da política de privacidade de forma independente", () => {
  cy.visit("./src/privacy.html"); // acessa a página da política de privacidade diretamente
  cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible"); // verifica se a página da política de privacidade está visível
  cy.contains("p", "Talking About Testing").should("be.visible"); // verifica se o texto "Talking About Testing" está visível
});
