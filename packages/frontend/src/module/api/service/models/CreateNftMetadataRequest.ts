/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateNftMetadataAttributeRequest } from './CreateNftMetadataAttributeRequest';

export type CreateNftMetadataRequest = {
    name?: string;
    description?: string;
    image?: string;
    /**
     * NFT backgroundColor in HEX
     */
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<CreateNftMetadataAttributeRequest>;
};

