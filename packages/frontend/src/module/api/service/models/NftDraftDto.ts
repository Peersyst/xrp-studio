/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetadataDto } from './MetadataDto';

export type NftDraftDto = {
    status: 'draft' | 'pending' | 'confirmed' | 'failed';
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    metadata?: MetadataDto;
    account: string;
    collectionId?: number;
};

