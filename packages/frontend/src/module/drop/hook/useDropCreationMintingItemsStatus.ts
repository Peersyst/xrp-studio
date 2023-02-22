import { useState } from "react";
import { CollectionDto, CollectionService } from "module/api/service";
import timeoutPolling from "module/common/util/timeoutPolling";

export interface UseDropCreationMintingItemsStatusResult {
    fetch: () => Promise<CollectionDto | undefined> | undefined;
    mintedNfts: number;
}

export default function (id: number, totalItems: number): UseDropCreationMintingItemsStatusResult {
    const [mintedNfts, setMintedNfts] = useState<number>(0);

    const fetch = (): Promise<CollectionDto | undefined> | undefined => {
        return timeoutPolling(
            () => CollectionService.collectionControllerGetCollection(id),
            (collection: CollectionDto) => {
                setMintedNfts(collection.items);
                return collection.items !== totalItems;
            },
        );
    };

    return {
        fetch,
        mintedNfts,
    };
}
