/* eslint-disable no-undef */

describe("Tests create capabilities on workflow page", (): void => {
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

  it("Tests create airport capabilities", (): void => {
    cy.get("button").contains("Add New Airport").click();
    cy.get("input").eq(0).type("ETIK");
    cy.get("input").eq(1).type("Illesheim AHP");
    cy.get(".input-group>button").contains("Create").click();
    cy.get("strong").contains("ETIK");
    cy.get(".airport-delete").eq(1).click();
  });

  it("Tests create named location capabilities", (): void => {
    cy.get("button").contains("Add New Location").click();
    cy.get("input").eq(0).type("Charleston");
    cy.get("input").eq(1).type("US");
    cy.get(".input-group>button").contains("Create").click();
    cy.get(".named-location-city-name").eq(1).should("have.text", "Charleston");
    cy.get(".named-location-delete").eq(1).click();
  });

  it("Tests create list capabilities", (): void => {
    cy.get("button").contains("Create New List").click();
    cy.get(".input-group>input").eq(0).type("My New List");
    cy.get(".input-group>button").contains("Save").click();
    cy.get("h3").contains("My New List");
    cy.get(".delete-list").eq(1).click();
  });

  it("Tests create task capabilities", (): void => {
    cy.get(".accordion-button").click();
    cy.get("button").contains("Create New Task").click();
    cy.get(".input-group>input").eq(0).type("Another new task");
    cy.get(".input-group>button").contains("Save").click();
    cy.get("h4").contains("Another new task");
    cy.get(".delete-task-button").eq(1).click();
  });
});
