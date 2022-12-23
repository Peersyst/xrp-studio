/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateNftDraftRequest = {
    properties: {
        issuer: {
            type: 'string',
            description: `Issuer of the NFT, if not provided the sender of the transaction acts as the issuer`,
            maxLength: 255,
        },
        transferFee: {
            type: 'number',
            description: `Transfer fee in percentage representing percentages from 0% to 50% with up to 3 decimals`,
            maximum: 50000,
        },
        flags: {
            type: 'all-of',
            description: `NFToken flags`,
            contains: [{
                type: 'NftFlagsRequest',
            }],
        },
        taxon: {
            type: 'number',
            description: `NFTokenTaxon that linked to the logged address will identify a collection`,
            maximum: 4294967295,
        },
        metadata: {
            type: 'all-of',
            description: `NFT metadata`,
            contains: [{
                type: 'CreateMetadataRequest',
            }],
        },
    },
} as const;
