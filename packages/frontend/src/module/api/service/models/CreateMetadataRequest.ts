/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateMetadataAttributeRequest } from './CreateMetadataAttributeRequest';

export type CreateMetadataRequest = {
    name?: string;
    description?: string;
    image?: string;
    /**
     * NFT backgroundColor in HEX
     */
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<CreateMetadataAttributeRequest>;
};

