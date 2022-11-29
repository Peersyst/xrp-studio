/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DropDto = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        items: {
            type: 'number',
            isRequired: true,
        },
        soldItems: {
            type: 'number',
            isRequired: true,
        },
        price: {
            type: 'string',
            isRequired: true,
        },
        backgroundColor: {
            type: 'string',
            isRequired: true,
        },
        fontColor: {
            type: 'string',
            isRequired: true,
        },
        videoUrl: {
            type: 'string',
        },
        instagram: {
            type: 'string',
        },
        twitter: {
            type: 'string',
        },
        discord: {
            type: 'string',
        },
        faqs: {
            type: 'array',
            contains: {
                type: 'FaqDto',
            },
        },
        collection: {
            type: 'CollectionDto',
        },
    },
} as const;
