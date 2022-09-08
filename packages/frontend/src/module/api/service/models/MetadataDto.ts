/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetadataAttributeDto } from './MetadataAttributeDto';

export type MetadataDto = {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<MetadataAttributeDto>;
};

