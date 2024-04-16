/* eslint-disable no-undef */

describe("Tests create capabilities on workflow page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".navbar-nav").eq(1).contains("Log In").click();
    cy.get(".modal-title").should("have.text", "Log In");
    cy.get("input").eq(0).type("cypress@cypress.com");
    cy.get("input").eq(1).type("cypress");
    cy.get(".btn-primary").click();
    cy.wait(1000);
  });

  beforeEach(() => {
    cy.visit("/workflow/");
  });

  it("Tests create airport capabilities", () => {
    cy.get("button").contains("Add New Airport").click();
    cy.get("input").eq(0).type("ETIK");
    cy.get("input").eq(1).type("Illesheim AHP");
    cy.get(".input-group>button").contains("Create").click();
    cy.get("strong").contains("ETIK");
    cy.get(".airport-delete").eq(1).click();
  });

  it("Tests create named location capabilities", () => {
    cy.get("button").contains("Add New Location").click();
    cy.get("input").eq(0).type("Charleston");
    cy.get("input").eq(1).type("US");
    cy.get(".input-group>button").contains("Create").click();
    cy.get("div").contains("Charleston");
    cy.get(".named-location-delete").eq(1).click();
  });

  it("Tests create list capabilities", () => {
    cy.get("button").contains("Create New List").click();
    cy.get(".input-group>input").eq(0).type("My New List");
    cy.get(".input-group>button").contains("Save").click();
    cy.get("h3").contains("My New List");
    cy.get(".delete-list").eq(1).click();
  });
});
