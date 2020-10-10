/// <reference types="cypress" />

const admin = Cypress.env("adminCredentials");

describe("Deve logar o usuário", () => {
  it("Deve ir para página de login.", () => {
    cy.visit("/login");
  });

  it("Deve preencher o formulário", () => {
    cy.get("[formcontrolname=email]").type(admin.email);
    cy.get("[formcontrolname=password]").type(admin.password);
  });

  it("Deve submeter login.", () => {
    cy.get("[class=btn]").click();
  });
});
