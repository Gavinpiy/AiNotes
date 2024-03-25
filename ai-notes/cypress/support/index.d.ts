// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable<Subject = any> {
    signOut(): void;
  }
}
