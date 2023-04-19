/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OfferDto = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        offerId: {
            type: 'string',
            isRequired: true,
        },
        offerHash: {
            type: 'string',
            isRequired: true,
        },
        creatorUser: {
            type: 'UserDto',
        },
        accepterUser: {
            type: 'UserDto',
        },
        acceptOfferHash: {
            type: 'string',
        },
        destination: {
            type: 'string',
        },
        amount: {
            type: 'string',
        },
        expiration: {
            type: 'number',
        },
    },
} as const;
