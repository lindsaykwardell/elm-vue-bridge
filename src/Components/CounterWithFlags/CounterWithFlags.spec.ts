import { mount } from "@cypress/vue";
import CounterWithFlags from "./CounterWithFlags";

it("CounterWithFlags", () => {
  mount(CounterWithFlags, {
    props: {
      flags: 2,
    },
  });

  cy.get("#counter").findByText("2").should("exist");
  cy.findByText("+").click();
  cy.get("#counter").findByText("3").should("exist");
  cy.findByText("-").click();
  cy.get("#counter").findByText("2").should("exist");
});
