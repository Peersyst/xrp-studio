import { Collection } from "../../database/entities/Collection";

export interface FindCollectionByTaxonAndAccountOptions {
    notFoundError?: boolean;
}

export interface CreateCollectionQueryBuilderOptions<WithItems extends boolean = boolean> {
    relations?: {
        user?: boolean;
        nft?: WithItems;
    };
}

export class CollectionWithItems extends Collection {
    items: number;
}
