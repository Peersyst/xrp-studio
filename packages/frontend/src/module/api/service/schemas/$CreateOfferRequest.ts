/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateOfferRequest = {
    properties: {
        nftId: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        price: {
            type: 'string',
            description: `Price in drops`,
            isRequired: true,
        },
        destination: {
            type: 'string',
            maxLength: 255,
        },
        expiration: {
            type: 'number',
        },
        owner: {
            type: 'string',
            maxLength: 255,
        },
        type: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
