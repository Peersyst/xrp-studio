/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionDto } from './CollectionDto';
import type { FaqDto } from './FaqDto';

export type DropDto = {
    id: number;
    items: number;
    soldItems: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs?: Array<FaqDto>;
    collection?: CollectionDto;
};

