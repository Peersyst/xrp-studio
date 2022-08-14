/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedNftDto = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'NftDto',
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
