/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuctionDto = {
    properties: {
        price: {
            type: 'number',
            isRequired: true,
        },
        endTimestamp: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
