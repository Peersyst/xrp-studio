/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateDropRequest = {
    properties: {
        collectionId: {
            type: 'number',
            isRequired: true,
        },
        price: {
            type: 'string',
            isRequired: true,
            pattern: '^[0-9]{1,15}$',
        },
        backgroundColor: {
            type: 'string',
            isRequired: true,
            pattern: '^#[0-9A-F]{6}$',
        },
        fontColor: {
            type: 'string',
            isRequired: true,
            pattern: '^#[0-9A-F]{6}$',
        },
        videoUrl: {
            type: 'string',
            maxLength: 1023,
            pattern: '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$',
        },
        instagram: {
            type: 'string',
            maxLength: 255,
        },
        twitter: {
            type: 'string',
            maxLength: 255,
        },
        discord: {
            type: 'string',
            maxLength: 255,
        },
        faqs: {
            type: 'array',
            contains: {
                type: 'CreateDropFaqsRequest',
            },
            isRequired: true,
        },
    },
} as const;
