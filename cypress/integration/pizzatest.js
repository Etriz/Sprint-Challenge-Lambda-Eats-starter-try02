/*global cy */
describe("order form test", () => {
  it("inputs", () => {
    cy.visit("http://localhost:3000");
    cy.get('[href="/pizza"] > button').click();
    cy.get("#name").type("Ryan").should("have.value", "Ryan");
    cy.get("#size").select("medium").should("have.value", "medium");
    cy.get("#alfredo").click();
    cy.get("#pepperoni").click().should("be.checked");
    cy.get("#mushrooms").click().should("be.checked");
    cy.get("#special").type("make it fast").should("have.value", "make it fast");
    cy.get("[type='submit']").click();
  });
});
