/// <reference types="cypress" />

describe("Adicionar um novo usuário", () => {
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

  it("Deve abrir o modal de usuários.", () => {
    cy.get(".fixed-action-btn a").click();
  });

  it("Deve preencher o formulário de usuário.", () => {
    cy.fixture("users/add-user.json").then((data) => {
      cy.get("input#name").type(data.name);
      cy.get("input#email").type(data.email);
      cy.get("input#password").type(data.password);
      cy.get("input#password-confirm").type(data.confirmPassword);
      cy.get(`p-radiobutton[id=role-employee]`).click();
    });
  });

  it("Deve salvar o usuário preenchido.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
