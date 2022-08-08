/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedCollectionDto = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'CollectionDto',
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
