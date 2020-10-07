/// <reference types="cypress" />

const productAdd = {
  name: "Produto Teste Automizado",
  description: "Descrição do produto teste automizado.",
  category: "nail",
};

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
    cy.get("input#name").type(productAdd.name);
    cy.get("textarea#description").type(productAdd.description);
    cy.get(`p-radiobutton[value=${productAdd.category}`).click();
  });

  it("Deve salvar o produto preenchido.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
