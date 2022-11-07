/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCollectionNftRequest = {
    properties: {
        issuer: {
            type: 'string',
            description: `Issuer of the NFT, if not provided the sender of the transaction acts as the issuer`,
            maxLength: 255,
        },
        transferFee: {
            type: 'number',
            description: `Transfer fee in percentage representing percentages from 0% to 50% with up to 3 decimals`,
            maximum: 50,
        },
        flags: {
            type: 'all-of',
            description: `NFToken flags`,
            contains: [{
                type: 'NftFlagsRequest',
            }],
        },
        metadata: {
            type: 'all-of',
            description: `NFT metadata`,
            contains: [{
                type: 'CreateNftMetadataRequest',
            }],
        },
    },
} as const;
