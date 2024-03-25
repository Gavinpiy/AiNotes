

describe("Signed out", () => {
    // beforeEach(() => {
    //   cy.signOut();
    // });
  
    it("should navigate to the homepage", () => {
      // open dashboard page
      cy.visit("http://localhost:3000/");
  
      // check h1 says signed out
      cy.get("p").contains("Notes Application");
    });
  
    it("should navigate to the sign in page", () => {
      // open dashboard page
      cy.visit("http://localhost:3000/");
  
      // click sign in button
      cy.get("button").contains("Get Started").click();
  
      // check h1 says sign in
      cy.get("h1").contains("Continue");
    });
  });