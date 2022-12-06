/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateCollectionNftRequest } from './CreateCollectionNftRequest';

export type UpdateCollectionRequest = {
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    nfts?: Array<CreateCollectionNftRequest>;
};

