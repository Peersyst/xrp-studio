/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNftMetadataAttributeRequest = {
    properties: {
        traitType: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        value: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        displayType: {
            type: 'string',
            maxLength: 256,
        },
    },
} as const;
