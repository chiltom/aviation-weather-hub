/* eslint-disable no-undef */

// Initial tests for home page and using link in navbar brand
describe("Initial render test suite for homepage", () => {
  it("Check for homepage load on baseUrl render", () => {
    cy.visit("/"); // Can use / because we set baseUrl as dev server port
    cy.get("h1").should("have.text", "The Aviation Weather Hub");
  });

  it("Check for navbar brand functionality", () => {
    cy.visit("/");
    cy.get(".navbar-brand").should("have.text", "Weather Hub");
    cy.get(".navbar-brand")
      .should("have.attr", "href")
      .and("contain", "/")
      .then((href) => cy.visit(href));
    cy.get(".navbar-brand").should("have.text", "Weather Hub");
  });
});
