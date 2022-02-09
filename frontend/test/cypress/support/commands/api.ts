// TODO: Document
import { addCommands, Prefix } from "./utils";

const instance = {
    /**
     * Minimum Description
     * @example
     */
    OnButton: (api: string, buttonText: string, method = "POST") => {
        cy.intercept(method, api).as("interceptAPI");
        cy.get("button").contains(buttonText).click();
        cy.wait("@interceptAPI").its("response.statusCode").should("eq", 200);
    },

    /**
     * Minimum Description
     * @example
     */
    OnContextMenu: (apiService: string, textButton: string, columnRightClick: string, method = "POST") => {
        cy.intercept(method, apiService).as("interceptAPI");
        cy.clickTableContextMenu(textButton, columnRightClick);
        cy.wait("@interceptAPI").its("response.statusCode").should("eq", 200);
    },

    /**
     * Minimum Description
     * @example
     */
    OnContextMenuOfSpecificValue: (apiService: string, textButton: string, columnRightClick: string, columnValue: string) => {
        cy.intercept("POST", apiService).as("interceptAPI");
        cy.clickTableContextMenuOnSpecificValue(textButton, columnRightClick, columnValue);
        cy.wait("@interceptAPI").its("response.statusCode").should("eq", 200);
    },
} as const;

const PREFIX = "interceptApiResponse";
export type Api = Prefix<typeof instance, typeof PREFIX>;
addCommands(instance, PREFIX);
