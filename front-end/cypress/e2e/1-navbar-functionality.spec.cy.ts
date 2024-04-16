/* eslint-disable no-undef */

describe("Tests the navbar w/o user signed in", (): void => {
  it("Makes sure the navbar appears on the page", (): void => {
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
      .contains("Training")
      .should("have.attr", "href", "/training/");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Flights")
      .should("have.attr", "href", "/flights/");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Workflow")
      .should("have.attr", "href", "/workflow/");
    cy.get(".navbar-nav").eq(1).contains("Sign Up");
    cy.get(".navbar-nav").eq(1).contains("Log In");
  });

  it("Accesses the anonymous user allowed pages", (): void => {
    cy.visit("/");
    cy.get(".navbar-nav").eq(0).contains("About").click();
    cy.get("h1").contains("About");
    cy.get(".navbar-nav").eq(1).contains("Sign Up").click();
    cy.get(".modal-title").should("have.text", "Sign Up");
    cy.get(".btn-close").click();
    cy.get(".navbar-nav").eq(1).contains("Log In").click();
    cy.get(".modal-title").should("have.text", "Log In");
    cy.get(".btn-close").click();
    cy.get(".navbar-brand").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Training")
      .should("have.class", "disabled");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Workflow")
      .should("have.class", "disabled");
    cy.get(".navbar-nav")
      .eq(0)
      .contains("Flights")
      .should("have.class", "disabled");
  });
});

describe("Tests the navbar w/ the user signed in", (): void => {
  it("Logs in to an account", (): void => {
    cy.visit("/");
    cy.get(".navbar-nav").eq(1).contains("Log In").click();
    cy.get(".modal-title").should("have.text", "Log In");
    cy.get("input").eq(0).type("cypress@cypress.com");
    cy.get("input").eq(1).type("cypress");
    cy.get(".btn-primary").click();
    cy.get(".navbar-nav")
      .eq(1)
      .contains("Signed in as: cypress")
      .should("have.attr", "href", "/userinfo/");
    cy.get(".navbar-nav>button").should("have.text", "Log Out");
  });

  it("Accesses all user allowed pages", (): void => {
    cy.visit("/");
    cy.get(".navbar-nav").eq(1).contains("Log In").click();
    cy.get(".modal-title").should("have.text", "Log In");
    cy.get("input").eq(0).type("cypress@cypress.com");
    cy.get("input").eq(1).type("cypress");
    cy.get(".btn-primary").click();
    cy.get(".navbar-nav")
      .eq(1)
      .contains("Signed in as: cypress")
      .should("have.attr", "href", "/userinfo/");
    cy.get(".navbar-nav>button").should("have.text", "Log Out");
    cy.get(".navbar-nav").eq(0).contains("Training").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/training/");
    });
    cy.get(".navbar-nav").eq(0).contains("Workflow").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/workflow/");
    });
    cy.get(".navbar-nav").eq(0).contains("Flights").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/flights/");
    });
    cy.get(".navbar-nav").eq(1).contains("Signed in as: cypress").click();
    cy.get("h2").should("have.text", "User Information");
  });
});
