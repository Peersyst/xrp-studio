import { useState } from "react";
import { useMutation } from "react-query";
import { CollectionCreationDraftsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/CollectionCreationDrafts.types";

export type UseAddCollectionNftsParams = Omit<CollectionCreationDraftsProps, "loading" | "drafts" | "draftLink" | "onDraftRemoved">;

export interface UseAddCollectionNftsReturn {
    draftsUploading: number;
    handleDraftsUpload: (quantity: number) => void;
    handleAddDrafts: (draftUrls: string[] | undefined) => void;
}

export default function ({
    onDraftsAdded,
    totalNfts,
    name,
    description,
    transferFee,
    externalUrl,
    backgroundColor,
    burnable = false,
    onlyXRP = false,
    transferable = true,
    attributes,
}: UseAddCollectionNftsParams): UseAddCollectionNftsReturn {
    const [draftsUploading, setDraftsUploading] = useState(0);

    const handleDraftsUpload = (quantity: number) => {
        setDraftsUploading(quantity);
    };

    const addDrafts = async (nftUrls: string[] | undefined = []): Promise<void> => {
        const newDrafts = nftUrls?.map((url, i) => {
            const index = i + totalNfts;
            return {
                id: index,
                transferFee: transferFee !== undefined ? Number(transferFee) * 1000 : undefined,
                flags: {
                    burnable,
                    onlyXRP,
                    trustLine: false,
                    transferable,
                },
                metadata: {
                    name: `${name} #${index + 1}`,
                    description: description || undefined,
                    backgroundColor: backgroundColor?.hex(),
                    externalUrl: externalUrl || undefined,
                    attributes: attributes || undefined,
                    image: url || undefined,
                },
            };
        });

        await Promise.resolve(onDraftsAdded?.(newDrafts));
    };

    const { mutate: handleAddDrafts } = useMutation(addDrafts, { onSuccess: () => setDraftsUploading(0) });

    return {
        draftsUploading,
        handleDraftsUpload,
        handleAddDrafts,
    };
}
