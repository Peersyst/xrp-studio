/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateCollectionRequest = {
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
        nfts: {
            type: 'array',
            contains: {
                type: 'CreateCollectionNftRequest',
            },
        },
    },
} as const;
