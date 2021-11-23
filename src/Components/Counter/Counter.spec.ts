import { mount } from "@cypress/vue";
import Counter from "./Counter";

it("Counter", () => {
  mount(Counter);

  cy.get("#counter").findByText("0").should("exist");
  cy.findByText("+").click();
  cy.get("#counter").findByText("1").should("exist");
  cy.findByText("-").click();
  cy.get("#counter").findByText("0").should("exist");
});
