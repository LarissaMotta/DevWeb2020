/// <reference types="cypress" />

const user = Cypress.env("adminCredentials");

describe("Deve logar o usuário", () => {
  it("Deve ir para página de login.", () => {
    cy.visit("/login");
  });

  it("Deve preencher o formulário", () => {
    cy.get("[formcontrolname=email]").type(user.email);
    cy.get("[formcontrolname=password]").type(user.password);
  });

  it("Deve submeter login.", () => {
    cy.get("[class=btn]").click();
  });
});
