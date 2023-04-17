/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NftPreviewDto = {
    properties: {
        status: {
            type: 'Enum',
            isRequired: true,
        },
        tokenId: {
            type: 'string',
            isRequired: true,
        },
        mintTransactionHash: {
            type: 'string',
            isRequired: true,
        },
        uri: {
            type: 'string',
        },
        offers: {
            type: 'array',
            contains: {
                type: 'OfferDto',
            },
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        issuer: {
            type: 'string',
        },
        transferFee: {
            type: 'number',
        },
        flags: {
            type: 'number',
            isRequired: true,
        },
        metadata: {
            type: 'MetadataDto',
        },
        user: {
            type: 'UserDto',
        },
        collection: {
            type: 'CollectionDto',
        },
        drop: {
            type: 'DropDto',
        },
    },
} as const;
