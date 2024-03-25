import "../support/commands.js";

describe("Signed out", () => {
  beforeEach(() => {
    cy.signOut();
  });

  it("should navigate to the homepage", () => {
    // open dashboard page
    cy.visit("https://ai-notes-chi.vercel.app/", { failOnStatusCode: false });

    // check h1 contains notes application- indicating home page
    cy.get("p").contains("Notes Application");
    // click sign in button
    cy.contains(/get started/i).click();
    cy.get("button").contains(/continue/i);

    //select email input
    cy.get("#identifier-field").type("gavinpiy@gmail.com");
    //click continue
    cy.get(".cl-formButtonPrimary").click();
    //select password input
    cy.get("#password-field").type("TestAccount123\\!!");
    //click continue
    cy.get(".cl-formButtonPrimary").click();
  });
//wait for 5 seconds then signout again
  // afterEach(() => {
  //   cy.wait(5000)
  //   cy.signOut();
  // });
});
