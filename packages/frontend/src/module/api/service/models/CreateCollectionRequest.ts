/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateNftDraftRequest } from './CreateNftDraftRequest';

export type CreateCollectionRequest = {
    /**
     * NFTokenTaxon of the collection. If not provided one will be assigned
     */
    taxon?: number;
    name: string;
    description?: string;
    image?: string;
    header?: string;
    nfts?: Array<CreateNftDraftRequest>;
};

