/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type CollectionDto = {
    id: number;
    taxon: number;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    items: number;
    account: string;
    user?: UserDto;
    nfts?: Array<any>;
};

