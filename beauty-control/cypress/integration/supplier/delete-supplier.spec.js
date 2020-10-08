/// <reference types="cypress" />

describe("Deletar um fornecedor na datatable", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Deve ir para página de fornecedores.", () => {
    cy.visit("/supplier");
  });

  it("Deve checar se existe pelo menos um fornecedor na datatable.", () => {
    cy.get("button[icon='pi pi-trash']").its("length").should("be.gt", 0);
  });

  it("Deve clicar no botão de remover do primeiro fornecedor da datatable.", () => {
    cy.get("button[icon='pi pi-trash']").first().click();
  });

  it("Deve confirmar a remoção do fornecedor.", () => {
    cy.get("p-confirmdialog button[ng-reflect-label=Sim]").click();
  });
});
