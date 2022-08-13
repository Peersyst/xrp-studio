/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftDraftDto } from './NftDraftDto';

export type PaginatedNftDraftDto = {
    items: Array<NftDraftDto>;
    pages: number;
    currentPage: number;
};

