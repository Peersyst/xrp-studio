import { CollectionCreationNftDraftPageScaffoldProps } from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/CollectionCreationNftDraftPageScaffold.types";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import { NftCreationForm } from "module/nft/types";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { Form, useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useSaveCollectionDraft from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/hook/useSaveCollectionDraft";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import CollectionCreationNftDraftHeader from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/CollectionCreationNftDraftHeader/CollectionCreationNftDraftHeader";

const CollectionCreationNftDraftPageScaffold = ({
    backPath,
    draft,
    onSave,
    collectionDrafts,
    draftLink,
    collectionName,
    loading = false,
    loadingCollectionNfts = false,
}: CollectionCreationNftDraftPageScaffoldProps): JSX.Element => {
    const translate = useTranslate();
    const { showToast } = useToast();

    const slots = useNftCreationPageSlots({ nft: draft, fixedCollection: collectionName, loading });

    const { handleSave, saving } = useSaveCollectionDraft(onSave);

    const handleSubmit = (data: NftCreationForm) => {
        const requestNft = createNftRequestFromForm(data);
        handleSave(requestNft);
        showToast(translate("changesApplied"), { type: "success" });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BaseNftPage
                activeCarouselNftId={draft?.id}
                collectionNfts={collectionDrafts}
                loadingCollectionNfts={loadingCollectionNfts}
                collectionNftLink={draftLink}
            >
                {{
                    header: <CollectionCreationNftDraftHeader saving={saving} backPath={backPath} />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default CollectionCreationNftDraftPageScaffold;
