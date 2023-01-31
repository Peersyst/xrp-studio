import CollectionCreationPageScaffold from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold";
import useTranslate from "module/common/hook/useTranslate";
import useCreateCollectionSubmit from "module/collection/page/CreateCollectionPage/hook/useCreateCollectionSubmit";
import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";
import { CollectionCreationAction } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold.types";
import useCreateCollectionState from "module/collection/page/CreateCollectionPage/hook/useCreateCollectionState";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";

const CreateCollectionPage = (): JSX.Element => {
    const translate = useTranslate();

    const {
        state: { nfts = [], ...restState },
        addNfts,
        removeNft,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setNft: _setNft,
        ...setters
    } = useCreateCollectionState();

    const { launching, saving, handleSubmit } = useCreateCollectionSubmit();

    const actions: ActionButtonProps<CollectionCreationAction>[] = [
        {
            label: translate("save"),
            action: "save",
            loading: saving,
        },
        {
            label: translate("publish"),
            action: "publish",
            disabled: !nfts.length,
            popover: {
                enabled: !nfts.length,
                message: translate("cantPublishCollectionWithoutNfts"),
            },
        },
        {
            label: translate("launch"),
            action: "launch",
            loading: launching,
            disabled: !nfts.length,
            popover: {
                enabled: !nfts.length,
                message: translate("cantLaunchCollectionWithoutNfts"),
            },
        },
    ];

    return (
        <CollectionCreationPageScaffold
            title={translate("createCollection")}
            backPath={CollectionRoutes.MY_COLLECTIONS}
            actions={actions}
            showDefaults
            totalNfts={nfts.length}
            drafts={nfts}
            draftLink={(draft) => CollectionRoutes.CREATE_COLLECTION_EDIT_NFT.replace(":draftId", draft.id.toString())}
            onDraftsAdded={addNfts}
            onDraftRemoved={removeNft}
            onSubmit={handleSubmit}
            {...restState}
            {...setters}
        />
    );
};

export default CreateCollectionPage;
