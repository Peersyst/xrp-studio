/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNftMetadataRequest = {
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
        backgroundColor: {
            type: 'string',
            description: `NFT backgroundColor in HEX`,
        },
        externalUrl: {
            type: 'string',
        },
        attributes: {
            type: 'array',
            contains: {
                type: 'CreateNftMetadataAttributeRequest',
            },
        },
    },
} as const;
