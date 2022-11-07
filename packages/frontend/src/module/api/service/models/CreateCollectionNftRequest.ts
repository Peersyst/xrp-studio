/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateNftMetadataRequest } from './CreateNftMetadataRequest';
import type { NftFlagsRequest } from './NftFlagsRequest';

export type CreateCollectionNftRequest = {
    /**
     * Issuer of the NFT, if not provided the sender of the transaction acts as the issuer
     */
    issuer?: string;
    /**
     * Transfer fee in percentage representing percentages from 0% to 50% with up to 3 decimals
     */
    transferFee?: number;
    /**
     * NFToken flags
     */
    flags?: NftFlagsRequest;
    /**
     * NFT metadata
     */
    metadata?: CreateNftMetadataRequest;
};

