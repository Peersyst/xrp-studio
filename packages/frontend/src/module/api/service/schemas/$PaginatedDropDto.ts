/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedDropDto = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'DropDto',
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
