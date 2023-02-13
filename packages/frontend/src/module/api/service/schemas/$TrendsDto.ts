/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TrendsDto = {
    properties: {
        nfts: {
            type: 'array',
            contains: {
                type: 'NftDto',
            },
            isRequired: true,
        },
        collections: {
            type: 'array',
            contains: {
                type: 'CollectionDto',
            },
            isRequired: true,
        },
        artists: {
            type: 'array',
            contains: {
                type: 'UserDto',
            },
            isRequired: true,
        },
        drops: {
            type: 'array',
            contains: {
                type: 'DropDto',
            },
            isRequired: true,
        },
    },
} as const;
