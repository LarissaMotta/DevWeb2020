/// <reference types="cypress" />

describe("Atualizar um usuário na dataview", () => {
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

  it("Deve checar se existe pelo menos um usuário na dataview.", () => {
    cy.get("button[icon='pi pi-pencil']").its("length").should("be.gt", 0);
  });

  it("Deve clicar no botão de editar do último usuário da dataview.", () => {
    cy.get("button[icon='pi pi-pencil']").last().click();
  });

  it("Deve alterar os campos do formulário do usuário selecionado no modal.", () => {
    cy.fixture("users/update-user.json").then((data) => {
      cy.get("input#name").clear().type(data.name);
      cy.get("input#email").clear().type(data.email);
      cy.get("input#password").clear().type(data.password);
      cy.get("input#password-confirm").clear().type(data.confirmPassword);
      cy.get(`p-radiobutton[id=role-employee]`).click();
    });
  });

  it("Deve salvar o usuário editado.", () => {
    cy.get("button[label=Salvar]").click();
  });
});
