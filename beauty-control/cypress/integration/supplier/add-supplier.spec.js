/// <reference types="cypress" />

describe("Adicionar um novo fornecedor", () => {
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

  it("Deve abrir o modal de fornecedores.", () => {
    cy.get(".fixed-action-btn a").click();
  });

  it("Deve preencher o formulário de fornecedor.", () => {
    cy.fixture("suppliers/add-supplier.json").then((data) => {
      cy.get("input#name").type(data.name);
      cy.get("input#telephone").type(data.telephone);
      cy.get("input#rating").type(data.rating);
      cy.get("textarea#observation").type(data.observation);
    });
  });

  it("Deve salvar o fornecedor preenchido.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
