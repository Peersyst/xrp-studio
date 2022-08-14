/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftDto } from './NftDto';

export type PaginatedNftDto = {
    items: Array<NftDto>;
    pages: number;
    currentPage: number;
};

