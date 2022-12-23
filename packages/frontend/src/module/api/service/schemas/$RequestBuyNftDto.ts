/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RequestBuyNftDto = {
    properties: {
        nftId: {
            type: 'number',
            isRequired: true,
        },
        xummRequestUuid: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
