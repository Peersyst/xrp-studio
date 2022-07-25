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
            type: 'string',
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
        user: {
            type: 'UserDto',
            isRequired: true,
        },
    },
} as const;
