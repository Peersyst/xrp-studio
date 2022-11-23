/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateMetadataAttributeRequest = {
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
            isNullable: true,
            maxLength: 255,
        },
    },
} as const;
