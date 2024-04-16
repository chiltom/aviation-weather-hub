/* eslint-disable no-undef */

describe("Tests update capabilities on workflow page", (): void => {
  beforeEach((): void => {
    cy.visit("/");
    cy.get(".navbar-nav").eq(1).contains("Log In").click();
    cy.get(".modal-title").should("have.text", "Log In");
    cy.get("input").eq(0).type("cypress@cypress.com");
    cy.get("input").eq(1).type("cypress");
    cy.get(".btn-primary").click();
    cy.wait(1000);
  });

  beforeEach((): void => {
    cy.visit("/workflow/");
  });

  it("Tests update airport capabilities", (): void => {
    cy.get(".edit-airport-button").eq(0).click();
    cy.get("input").eq(1).clear();
    cy.get("input").eq(1).type("Hunter AAF");
    cy.get(".input-group>button").contains("Save").click();
    cy.get("div").contains("KSVN - Hunter AAF");
  });

  it("Tests update named location capabilities", (): void => {
    cy.get(".edit-named-location-button").click();
    cy.get("input").eq(0).clear();
    cy.get("input").eq(0).type("Pooler");
    cy.get(".input-group>button").contains("Save").click();
    cy.get(".named-location-city-name").eq(0).should("have.text", "Pooler");
  });

  it("Tests update list capabilities", (): void => {
    cy.get(".rename-list-button").click();
    cy.get(".input-group>input").eq(0).clear();
    cy.get(".input-group>input").eq(0).type("Another List");
    cy.get(".input-group>button").contains("Save").click();
    cy.get("h3").contains("Another List");
  });

  it("Tests update task capabilities", (): void => {
    cy.get(".accordion-button").click();
    cy.get(".edit-task-button").click();
    cy.get("input").eq(0).clear();
    cy.get("input").eq(0).type("Newer Task");
    cy.get("button").contains("Save").click();
    cy.get("h4").contains("Newer Task");
  });
});
