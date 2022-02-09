/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Chainable = Cypress.Chainable;

/**
 * Add cypress commands by record
 */
export const addCommands = (
    obj: Record<string, (...args: any[]) => Cypress.CanReturnChainable>,
    prefix = "",
    options: Cypress.CommandOptions = { prevSubject: false },
) => {
    for (const [key, payload] of Object.entries(obj))
        Cypress.Commands.add(
            (prefix ? `${prefix}${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}` : key) as keyof Chainable,
            options,
            payload,
        );
};

type ParamsChain<T extends (...args: any) => any> = T extends (subject: Chainable<any>, ...args: infer P) => any ? P : never;

/**
 * Type for export chainable commands
 */
export type Chain<T extends Record<string, any>> = {
    [P in keyof T]: (...args: ParamsChain<T[P]>) => ReturnType<T[P]>;
};

/**
 * Type for prefix Records
 */
export type Prefix<T extends Record<string, any>, Prefix extends string = ""> = {
    [P in keyof T as Prefix extends "" ? P : `${Prefix}${Capitalize<string & P>}`]: T[P];
};
