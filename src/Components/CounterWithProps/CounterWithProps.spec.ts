import { mount } from "@cypress/vue";
import CounterWithProps from "./CounterWithPropsWrapper.vue";

it("CounterWithProps", () => {
  mount(CounterWithProps);

  cy.get("#counter").findAllByText("3").should("exist");
  cy.findByText("+").click();
  cy.findByText("Value in Vue: 4").should("exist");
  cy.get("#counter").findAllByText("4").should("exist");
  cy.findByText("-").click();
  cy.findByText("Value in Vue: 3").should("exist");
  cy.get("#counter").findAllByText("3").should("exist");
  cy.get("#vue-plus").click();
  cy.get("#counter").findAllByText("4").should("exist");
  cy.get("#vue-minus").click();
  cy.get("#counter").findAllByText("3").should("exist");
});
