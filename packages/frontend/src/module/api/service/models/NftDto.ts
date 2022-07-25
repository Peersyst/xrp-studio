/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';
import type { MetadataDto } from './MetadataDto';
import type { UserDto } from './UserDto';

export type NftDto = {
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    status: 'draft' | 'pending' | 'confirmed' | 'failed';
    metadata?: MetadataDto;
    user: UserDto;
    collection?: CollectionDto;
};

