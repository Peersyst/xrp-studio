import Chainable = Cypress.Chainable;
import { addCommands, Chain, Prefix } from "./utils";

const iElement = {
    chainElement: (subject: Chainable<Element>, str: string) => subject.contains(str),
    checkChain: (subject: Chainable<Element>) => subject.prefixedChainElement("some").contains("bar"),
} as const;

const PREFIX = "prefixed";
const options: Cypress.CommandOptions = { prevSubject: "element" };
export type ExampleChain = Prefix<Chain<typeof iElement>, typeof PREFIX>;
addCommands(iElement, PREFIX, options);
