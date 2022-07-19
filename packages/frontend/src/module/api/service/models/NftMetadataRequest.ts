/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftMetadataAttributesRequest } from './NftMetadataAttributesRequest';

export type NftMetadataRequest = {
    name?: string;
    description?: string;
    image?: string;
    /**
     * NFT backgroundColor in HEX
     */
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<NftMetadataAttributesRequest>;
};

