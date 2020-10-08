/// <reference types="cypress" />

describe("Deletar um usuário na dataview", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Deve ir para página de usuários.", () => {
    cy.visit("/user");
  });

  it("Deve checar se existe pelo menos um usuário na dataview para ser deletado.", () => {
    cy.get("button[icon='pi pi-trash']").its("length").should("be.gt", 0);
  });

  it("Deve clicar no botão de remover do último usuário da dataview.", () => {
    cy.get("button[icon='pi pi-trash']").last().click();
  });

  it("Deve confirmar a remoção do usuário.", () => {
    cy.get("p-confirmdialog button[ng-reflect-label=Sim]").click();
  });
});
