/// <reference types="cypress" />

describe("Adicionar um novo produto", () => {
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

  it("Deve abrir o modal de produtos.", () => {
    cy.get(".fixed-action-btn a").click();
  });

  it("Deve preencher o formulário de produtos no modal.", () => {
    cy.fixture("products/add-product.json").then((data) => {
      cy.get("input#name").type(data.name);
      cy.get("textarea#description").type(data.description);
      cy.get(`p-radiobutton[value=${data.category}]`).click();
    });
  });

  it("Deve salvar o produto preenchido.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
