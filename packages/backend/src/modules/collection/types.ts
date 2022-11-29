import { Collection } from "../../database/entities/Collection";

export interface FindCollectionByTaxonAndAccountOptions {
    notFoundError?: boolean;
}

export interface CreateCollectionQueryBuilderOptions<WithItems extends boolean = boolean> {
    withItems?: WithItems;
    relations?: {
        user?: boolean;
        nft?: boolean;
    };
}

export class CollectionWithItems extends Collection {
    items: number;
}
