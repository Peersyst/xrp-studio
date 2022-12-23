/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DropDto } from './DropDto';

export type PaginatedDropDto = {
    items: Array<DropDto>;
    pages: number;
    currentPage: number;
};

