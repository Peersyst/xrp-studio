/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';
import type { DropDto } from './DropDto';
import type { MetadataDto } from './MetadataDto';
import type { UserDto } from './UserDto';

export type NftDto = {
    status: 'draft' | 'pending' | 'confirmed' | 'failed';
    tokenId: string;
    mintTransactionHash: string;
    uri?: string;
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    metadata?: MetadataDto;
    user?: UserDto;
    collection?: CollectionDto;
    drop?: DropDto;
};

