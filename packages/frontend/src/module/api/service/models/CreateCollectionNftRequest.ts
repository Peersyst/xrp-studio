/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateMetadataRequest } from './CreateMetadataRequest';
import type { NftFlagsRequest } from './NftFlagsRequest';

export type CreateCollectionNftRequest = {
    /**
     * The id of the nft if its already a draft
     */
    id?: number;
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
    metadata?: CreateMetadataRequest;
};

