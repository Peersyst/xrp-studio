/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCollectionRequest = {
    properties: {
        taxon: {
            type: 'number',
            description: `NFTokenTaxon of the collection. If not provided one will be assigned`,
            maximum: 4294967295,
        },
        name: {
            type: 'string',
            maxLength: 255,
        },
        description: {
            type: 'string',
            maxLength: 4000,
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
