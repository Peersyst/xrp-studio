/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MetadataDto = {
    properties: {
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
        },
        externalUrl: {
            type: 'string',
        },
        attributes: {
            type: 'array',
            contains: {
                type: 'MetadataAttributeDto',
            },
        },
    },
} as const;
