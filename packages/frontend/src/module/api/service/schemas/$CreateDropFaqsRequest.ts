/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateDropFaqsRequest = {
    properties: {
        question: {
            type: 'string',
            isRequired: true,
            maxLength: 2048,
        },
        answer: {
            type: 'string',
            isRequired: true,
            maxLength: 4096,
        },
    },
} as const;
