/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';
import type { NftDto } from './NftDto';
import type { UserDto } from './UserDto';

export type TrendsDto = {
    nfts: Array<NftDto>;
    collections: Array<CollectionDto>;
    artists: Array<UserDto>;
};

