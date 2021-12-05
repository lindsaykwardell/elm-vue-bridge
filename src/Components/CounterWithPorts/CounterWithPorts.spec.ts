import { mount } from "@cypress/vue";
import CounterWithPorts from "./CounterWithPorts";

it("CounterWithPorts", () => {
  let receivedValue = 0;

  mount(CounterWithPorts, {
    props: {
      flags: 0,
      ports: (ports: any) => {
        console.log(ports);
        ports.receiveCount.send(4);
        ports.sendCount.subscribe((value: number) => {
          console.log(value);
          receivedValue = value;
        });
      },
    },
  });

  cy.get("#counter")
    .findByText("4")
    .should("exist")
    .then(() => expect(receivedValue).to.equal(4));
  cy.findByText("+").click();
  cy.get("#counter")
    .findByText("5")
    .should("exist")
    .then(() => expect(receivedValue).to.equal(5));
  cy.findByText("-").click();
  cy.get("#counter")
    .findByText("4")
    .should("exist")
    .then(() => expect(receivedValue).to.equal(4));
});
