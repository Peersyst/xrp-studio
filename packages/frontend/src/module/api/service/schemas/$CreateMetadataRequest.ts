/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateMetadataRequest = {
    properties: {
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
                type: 'CreateMetadataAttributeRequest',
            },
        },
    },
} as const;
