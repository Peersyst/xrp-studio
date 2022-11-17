/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FaqsDto = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        question: {
            type: 'string',
            isRequired: true,
        },
        answer: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
