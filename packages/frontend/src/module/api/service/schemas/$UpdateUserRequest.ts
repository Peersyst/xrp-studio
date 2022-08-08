/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateUserRequest = {
    properties: {
        name: {
            type: 'string',
            maxLength: 255,
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
            maxLength: 255,
        },
        discord: {
            type: 'string',
            maxLength: 255,
        },
    },
} as const;
