describe("homepage", () => {

  beforeEach(function () {
    // Retry visit with failOnStatusCode: false
    cy.visit("https://ai-notes-chi.vercel.app/", { failOnStatusCode: false });
});


  it("navigates to  page", () => {
    //This is checking for the login button and clicking it
  cy.contains(/get started/i);
  }
  );
})