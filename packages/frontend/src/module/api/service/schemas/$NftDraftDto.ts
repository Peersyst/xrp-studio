/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NftDraftDto = {
    properties: {
        status: {
            type: 'Enum',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        issuer: {
            type: 'string',
        },
        transferFee: {
            type: 'number',
        },
        flags: {
            type: 'number',
            isRequired: true,
        },
        metadata: {
            type: 'MetadataDto',
        },
        user: {
            type: 'UserDto',
        },
        collection: {
            type: 'CollectionDto',
        },
        drop: {
            type: 'DropDto',
        },
    },
} as const;
