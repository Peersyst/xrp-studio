/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedNftDraftDto = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'NftDraftDto',
            },
            isRequired: true,
        },
        pages: {
            type: 'number',
            isRequired: true,
        },
        currentPage: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
