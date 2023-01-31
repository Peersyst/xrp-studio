import { useMutation } from "react-query";
import { CollectionCreationDraftsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/CollectionCreationDrafts.types";

export interface UseRemoveCollectionDraftReturn {
    removing: boolean;
    handleRemoveDraft: (id: number) => void;
}

export default function (onDraftRemoved: CollectionCreationDraftsProps["onDraftRemoved"]): UseRemoveCollectionDraftReturn {
    const removeDraft = (id: number): Promise<void> => Promise.resolve(onDraftRemoved(id));
    const { mutate: handleRemoveDraft, isLoading: removing } = useMutation(removeDraft, { onMutate: () => undefined });

    return {
        removing,
        handleRemoveDraft,
    };
}
