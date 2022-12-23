/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateUserRequest = {
    properties: {
        name: {
            type: 'string',
            maxLength: 32,
        },
        description: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        header: {
            type: 'string',
        },
        twitter: {
            type: 'string',
            maxLength: 15,
        },
        discord: {
            type: 'string',
            maxLength: 32,
            minLength: 2,
        },
    },
} as const;
