// LOGIN - utilização de token/bearer autenticação//
import "cypress-localstorage-commands";

const env = Cypress.env();

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
		url: `${env.apiUrl}${env.routes.login}`,
		form: true,
    body: {
      email: env.adminCredentials.email,
      password: env.adminCredentials.password,
    }
  })
    .its("body")
    .then((token) => {
      cy.setLocalStorage(env.tokenKey, token.access_token);
    });
});
