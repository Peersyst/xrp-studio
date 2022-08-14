import { Nft } from "../../database/entities/Nft";
import { CollectionWithItems } from "../collection/types";

export interface CreateNftQueryBuilderOptions<WithCollection extends boolean = boolean> {
    relations?: {
        user?: boolean;
        collection?: WithCollection;
        metadata?: boolean;
        attribute?: boolean;
    };
}

export class NftWithCollection extends Nft {
    collection?: CollectionWithItems;
}
