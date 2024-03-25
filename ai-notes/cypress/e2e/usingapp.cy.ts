import "../support/commands.js";

describe("Signed in", () => {
  beforeEach(() => {
    cy.signIn();
  });

  it("should navigate to the notes page", () => {
    // open dashboard page
    cy.visit("https://ai-notes-chi.vercel.app/notes", {
      failOnStatusCode: false,
    });
    cy.wait(1000)
    cy.get('button').contains(/add/i).click();
    cy.get('input[name="title"]').type('Cypress Note');
    cy.get('textarea[name="content"]').type('This is a note created by Cypress');
    cy.get('button').contains(/submit/i).click();
    cy.get('.mx-14 > :nth-child(1)').click();
    cy.get('textarea[name="content"]').type('\n\n Updated by Cypress');
    cy.get('button').contains(/submit/i).click();

   
  });
});
