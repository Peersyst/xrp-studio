import { polling } from "@peersyst/react-utils";
import { useState } from "react";
import { CollectionDto, CollectionService } from "module/api/service";

export interface UseDropCreationMintingItemsStatusResult {
    fetch: () => Promise<CollectionDto> | undefined;
    mintedNfts: number;
}

export default function (id: number, totalItems: number): UseDropCreationMintingItemsStatusResult {
    const [mintedNfts, setMintedNfts] = useState<number>(0);

    const fetch = (): Promise<CollectionDto> | undefined => {
        return polling(
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
