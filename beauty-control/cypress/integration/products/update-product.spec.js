/// <reference types="cypress" />

describe("Atualizar um produto na dataview", () => {
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
    cy.get("button[icon='pi pi-pencil']").its("length").should("be.gt", 0);
  });

  it("Deve clicar no botão de editar do último produto da dataview.", () => {
    cy.get("button[icon='pi pi-pencil']").last().click();
  });

  it("Deve alterar os campos do formulário do produto selecionado no modal.", () => {
    cy.fixture("products/update-product.json").then((data) => {
      cy.get("input#name").clear().type(data.name);
      cy.get("textarea#description").clear().type(data.description);
      cy.get(`p-radiobutton[value=${data.category}]`).click();
    });
  });

  it("Deve salvar o produto editado.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
