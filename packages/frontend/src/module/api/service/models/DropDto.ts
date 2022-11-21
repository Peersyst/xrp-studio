/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';
import type { FaqsDto } from './FaqsDto';

export type DropDto = {
    id: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqsDto>;
    collection: CollectionDto;
};

