/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CollectionDto = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        taxon: {
            type: 'number',
            isRequired: true,
        },
        name: {
            type: 'string',
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
        items: {
            type: 'number',
            isRequired: true,
        },
        account: {
            type: 'string',
            isRequired: true,
        },
        user: {
            type: 'UserDto',
        },
    },
} as const;
