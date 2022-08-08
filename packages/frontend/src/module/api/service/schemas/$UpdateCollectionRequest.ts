/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateCollectionRequest = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
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
    },
} as const;
