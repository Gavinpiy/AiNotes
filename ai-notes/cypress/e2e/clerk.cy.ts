

describe("Signed out", () => {
    // beforeEach(() => {
    //   cy.signOut();
    // });
  
    it("should navigate to the homepage", () => {
      // open dashboard page
      cy.visit("https://ai-notes-chi.vercel.app/" , { failOnStatusCode: false });
  
      // check h1 contains notes application- indicaiting home page
      cy.get("p").contains("Notes Application");
      // click sign in button
      cy.contains(/get started/i).click();
      cy.get("button").contains(/continue/i);    

    });
  
    
  });