import { CreateNftDraftRequest } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";

export interface UseSetCollectionCreationNftMutationParams {
    index: number;
    nft: CreateNftDraftRequest;
}

export default function (): UseMutationResult<void, unknown, UseSetCollectionCreationNftMutationParams> {
    const [collectionCreationState, setCollectionCreationState] = useCollectionCreationState();

    return useMutation(async ({ index, nft }: UseSetCollectionCreationNftMutationParams) => {
        await new Promise((resolve) => {
            const nfts = [...collectionCreationState.nfts];
            nfts[index] = { ...nft, id: index };
            setCollectionCreationState({
                nfts,
            });
            resolve(void 0);
        });
    });
}
