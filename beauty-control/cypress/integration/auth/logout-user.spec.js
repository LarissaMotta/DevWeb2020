/// <reference types="cypress" />

describe("Deve deslogar o usuário", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  it("Deve ir para página inicial.", () => {
    cy.visit("/home");
  });

  it("Deve esperar 2 segundos na página inicial.", () => {
    cy.wait(2000);
  });

  it("Deve clicar no botão de logout.", () => {
    cy.get("nav a[title=Sair]").click();
  });
});
