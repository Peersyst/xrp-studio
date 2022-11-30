/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserDto = {
    properties: {
        address: {
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
        twitter: {
            type: 'string',
        },
        discord: {
            type: 'string',
        },
        verifiedArtist: {
            type: 'boolean',
        },
        nftsCount: {
            type: 'number',
        },
    },
} as const;
