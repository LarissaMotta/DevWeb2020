/// <reference types="cypress" />

describe("Deletar um produto na dataview", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Deve ir para página de produtos.", () => {
    cy.visit("/product");
  });

  it("Deve checar se existe pelo menos um produto na dataview.", () => {
    cy.get("button[icon='pi pi-trash']").its("length").should("be.gt", 0);
  });

  it("Deve clicar no botão de remover do último produto da dataview.", () => {
    cy.get("button[icon='pi pi-trash']").last().click();
  });

  it("Deve confirmar a remoção do produto.", () => {
    cy.get("p-confirmdialog button[ng-reflect-label=Sim]").click();
  });
});
