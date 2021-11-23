import { mount } from "@cypress/vue";
import CounterWithProps from "./CounterWithProps";

it("CounterWithProps", () => {
  mount(CounterWithProps, {
    props: {
      initialValue: 3,
    },
  });

  cy.get("#counter").findByText("3").should("exist");
  cy.findByText("+")
    .click()
    // @ts-ignore
    .vue()
    .then((wrapper: any) =>
      expect(wrapper.emitted("sendCount")[0][0]).to.equal(4)
    );
  cy.get("#counter").findByText("4").should("exist");
  cy.findByText("-")
    .click()
    // @ts-ignore
    .vue()
    .then((wrapper: any) =>
      expect(wrapper.emitted("sendCount")[1][0]).to.equal(3)
    );
  cy.get("#counter").findByText("3").should("exist");
});
