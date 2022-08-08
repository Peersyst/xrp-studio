/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNftMetadataAttributeRequest = {
    properties: {
        traitType: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        value: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        displayType: {
            type: 'string',
            maxLength: 255,
        },
    },
} as const;
