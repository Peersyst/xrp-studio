/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateDropFaqsRequest } from './CreateDropFaqsRequest';

export type CreateDropRequest = {
    collectionId: number;
    paymentHash: string;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<CreateDropFaqsRequest>;
};

