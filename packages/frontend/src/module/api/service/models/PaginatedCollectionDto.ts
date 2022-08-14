/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';

export type PaginatedCollectionDto = {
    items: Array<CollectionDto>;
    pages: number;
    currentPage: number;
};

