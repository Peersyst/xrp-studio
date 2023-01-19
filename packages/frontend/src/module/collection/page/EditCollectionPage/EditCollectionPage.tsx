import CollectionCreationPageScaffold from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold";
import useTranslate from "module/common/hook/useTranslate";
import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";
import { CollectionCreationAction } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold.types";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import useEditCollectionState from "module/collection/page/EditCollectionPage/hook/useEditCollectionState";
import useEditCollectionSubmit from "module/collection/page/EditCollectionPage/hook/useEditCollectionSubmit";
import { useParams } from "react-router-dom";
import useGetCollection from "module/collection/query/useGetCollection";
import { usePaginatedList } from "@peersyst/react-hooks";
import useDeleteNftDraft from "module/nft/query/useDeleteNftDraft";
import useAddCollectionDrafts from "module/collection/page/EditCollectionPage/hook/useAddCollectionDrafts";
import useGetMyNfts from "module/nft/query/useGetMyNfts";
import { useMemo } from "react";
import { CollectionCreationNft } from "module/collection/types";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";

const EditCollectionPage = (): JSX.Element => {
    const translate = useTranslate();

    const { state, setState, ...setters } = useEditCollectionState();

    const { id: collectionIdParam } = useParams();
    const collectionId = collectionIdParam !== undefined ? Number(collectionIdParam) : undefined;
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId ? Number(collectionId) : undefined, {
        refetchOnMount: "always",
        onSuccess: ({ header, image, name = "", description = "" }) => setState({ header, image, name, description }),
    });

    // TODO: Add drafts/published queries instead of traversing all my nfts multiple times
    const { data: collectionNftsData, isLoading: loadingCollectionNfts } = useGetMyNfts(
        { collections: [collection?.id || 0] },
        { enabled: !!collection },
    );
    const collectionNfts = usePaginatedList(collectionNftsData?.pages, (page) => page.items);
    const collectionNftDrafts = useMemo(
        () =>
            collectionNfts.reduce((prevDrafts, currDraft) => {
                if (currDraft.status !== "confirmed" && currDraft.status !== "pending") return [...prevDrafts, currDraft];
                else return prevDrafts;
            }, [] as CollectionCreationNft[]),
        [collectionNftsData],
    );
    const notAllNftsAreDrafts = collectionNfts.some((nft) => nft.status !== "draft");

    const { mutateAsync: addCollectionDrafts } = useAddCollectionDrafts(collection);
    const { mutateAsync: deleteNftDraft } = useDeleteNftDraft();

    const { launching, saving, handleSubmit } = useEditCollectionSubmit(collection);

    if (!collection && !collectionLoading) return <NotFoundPage />;

    const actions: ActionButtonProps<CollectionCreationAction>[] = [
        {
            label: translate("save"),
            action: "save",
            loading: saving,
        },
        {
            label: translate("publish"),
            action: "publish",
            disabled: !collectionNftDrafts.length,
            popover: {
                enabled: !collectionNftDrafts.length,
                message: translate("cantPublishCollectionWithoutNfts"),
            },
        },
        {
            label: translate("launch"),
            action: "launch",
            loading: launching,
            disabled: !collectionNftDrafts.length || notAllNftsAreDrafts,
            popover: {
                enabled: !collectionNftDrafts.length || notAllNftsAreDrafts,
                message: translate(notAllNftsAreDrafts ? "cantLaunchCollectionWithPublishedNfts" : "cantLaunchCollectionWithoutNfts"),
            },
        },
    ];

    return (
        <CollectionCreationPageScaffold
            loading={collectionLoading || loadingCollectionNfts}
            title={translate("createCollection")}
            backPath={CollectionRoutes.MY_COLLECTIONS}
            actions={actions}
            showDefaults={false}
            totalNfts={collection?.nfts?.length || 0}
            drafts={collectionNftDrafts}
            draftLink={(draft) =>
                CollectionRoutes.EDIT_COLLECTION_EDIT_NFT.replace(":id", collectionId!.toString()).replace(":draftId", draft.id.toString())
            }
            onDraftsAdded={addCollectionDrafts}
            onDraftRemoved={deleteNftDraft}
            onSubmit={handleSubmit}
            {...state}
            {...setters}
        />
    );
};

export default EditCollectionPage;
