import { useParams } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import CollectionCreationNftDraftPageScaffold from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/CollectionCreationNftDraftPageScaffold";
import { CreateCollectionNftRequest } from "module/api/service";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import useGetNftDraft from "module/nft/query/useGetNftDraft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import nftDraftToCreation from "module/collection/util/nftDraftToCreation";
import { useMemo } from "react";
import { usePaginatedList } from "@peersyst/react-hooks";
import useGetNftDrafts from "module/nft/query/useGetNftDrafts";
import useGetCollectionByPath from "module/collection/query/useGetCollectionByPath";

const EditCollectionNftDraftPage = (): JSX.Element => {
    const { path: collectionPath, draftId: draftIdParam } = useParams();
    const draftId = draftIdParam !== undefined ? Number(draftIdParam) : undefined;

    const { data: collection, isLoading: collectionIsLoading } = useGetCollectionByPath(collectionPath);

    const { data: draft, isLoading: draftIsLoading } = useGetNftDraft(draftId);
    const creationDraft = useMemo(() => (draft ? nftDraftToCreation(draft) : undefined), [draft]);

    // TODO: Add drafts/published queries instead of traversing all my nfts multiple times
    const { data: collectionNftsData, isLoading: collectionNftsLoading } = useGetNftDrafts(
        { collections: [collection?.id || 0] },
        { enabled: !!collection },
    );
    const collectionNfts = usePaginatedList(collectionNftsData?.pages, (page) => page.items);
    const collectionNftDrafts = useMemo(
        () => collectionNfts.filter((nft) => nft.status !== "confirmed" && nft.status !== "pending"),
        [collectionNftsData],
    );

    const { mutateAsync: updateDraft } = useUpdateNftDraft();

    if ((!collection && !collectionIsLoading) || (!draft && !draftIsLoading)) return <NotFoundPage />;

    const handleSave = async (data: CreateCollectionNftRequest): Promise<void> =>
        updateDraft({ ...data, taxon: collection!.taxon, id: draftId!, publish: false });

    return (
        <CollectionCreationNftDraftPageScaffold
            loading={collectionIsLoading || draftIsLoading}
            backPath={CollectionRoutes.EDIT_COLLECTION.replace(":path", collectionPath!)}
            draft={creationDraft}
            onSave={handleSave}
            collectionDrafts={collectionNftDrafts}
            loadingCollectionNfts={collectionNftsLoading}
            draftLink={({ id }) =>
                CollectionRoutes.EDIT_COLLECTION_EDIT_NFT.replace(":path", collectionPath!).replace(":draftId", id.toString())
            }
            collectionName={collection?.name}
        />
    );
};

export default EditCollectionNftDraftPage;
