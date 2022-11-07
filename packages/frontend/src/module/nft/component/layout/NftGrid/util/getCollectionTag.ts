import { CollectionDto } from "module/api/service";
import { NftCollectionTag } from "../NftGrid.types";

export default function getCollectionTag(collection: CollectionDto): NftCollectionTag {
    return {
        label: collection.name || "Col. " + collection.taxon,
        value: collection.id,
    };
}
