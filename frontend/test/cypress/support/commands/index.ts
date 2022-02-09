import "./api";
import { Api } from "./api";
import "./exampleChain";
import { ExampleChain } from "./exampleChain";

// Before do something read documentation:
// https://docs.cypress.io/api/cypress-api/custom-commands
// Especially https://docs.cypress.io/api/cypress-api/custom-commands#Best-Practices
export type Commands = Api & ExampleChain;
