/// <reference types="cypress" />

describe("Atualizar um fornecedor na datatable", () => {
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
    cy.get("table tbody tr").its("length").should("be.gt", 0);
  });

  it("Deve selecionar a primeira linha da datatable para editar o fornecedor.", () => {
    cy.get("table tbody tr").first().click();
  });

  it("Deve alterar os campos do formulário do fornecedor selecionado.", () => {
    cy.fixture("suppliers/update-supplier.json").then((data) => {
        cy.get("input#name").clear().type(data.name);
        cy.get("input#telephone").clear().type(data.telephone);
        cy.get("input#rating").clear().type(data.rating);
        cy.get("textarea#observation").clear().type(data.observation);
      });
  });

  it("Deve salvar o fornecedor editado.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
