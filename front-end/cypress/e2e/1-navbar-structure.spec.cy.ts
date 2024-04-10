/* eslint-disable no-undef */

describe("Tests the structure of the navbar w/o user signed in", () => {
  it("Makes sure the navbar appears on the page", () => {
    cy.visit("/");
    cy.get(".navbar").should("exist");
    cy.get(".navbar-toggler").should("exist"); // Check this in cypress local
    cy.get(".navbar-brand").should("have.text", "Weather Hub");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("About")
      .should("have.attr", "href", "/about/");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Workflow")
      .should("have.attr", "href", "/workflow/");
    cy.get(".navbar-nav")
      .eq(1)
      .contains("Sign Up")
      .should("have.attr", "href", "/signup/");
    cy.get(".navbar-nav")
      .eq(1)
      .contains("Log In")
      .should("have.attr", "href", "/login/");
  });
});
