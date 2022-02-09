import { Commands } from "./commands";

declare global {
    namespace Cypress {
        type Chainable = Commands;
    }
}
