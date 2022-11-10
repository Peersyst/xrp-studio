import EditNftCreationPageHeader from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { Form, useToast } from "@peersyst/react-components";
import { useNavigate, useParams } from "react-router-dom";
import { NftCreationForm } from "module/nft/types";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import useSetCollectionCreationNft from "module/collection/query/useSetCollectionCreationNft";
import useTranslate from "module/common/hook/useTranslate";

const EditCollectionNftDraftPage = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { index: nftDraftIndexParam } = useParams();
    const nftDraftIndex = nftDraftIndexParam !== undefined ? Number(nftDraftIndexParam) : undefined;

    const { showToast } = useToast();

    const [collectionCreationState] = useCollectionCreationState();
    const nfts = collectionCreationState.nfts;
    const nft = nftDraftIndex !== undefined ? nfts[nftDraftIndex] : undefined;

    const { mutate: setCollectionCreationNft, isLoading: savingNft } = useSetCollectionCreationNft();

    const slots = useNftCreationPageSlots({ nft, fixedCollection: collectionCreationState.name });

    if (nftDraftIndex === undefined || nftDraftIndex >= nfts.length) {
        navigate(CollectionRoutes.CREATE_COLLECTION);
    }

    const handleSubmit = (data: NftCreationForm) => {
        const requestNft = createNftRequestFromForm(data);
        setCollectionCreationNft({ index: nftDraftIndex!, nft: requestNft });
        showToast(translate("changesApplied"), { type: "success" });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BaseNftPage
                key={nftDraftIndex}
                activeCarouselNftId={nftDraftIndex}
                collectionNfts={nfts}
                collectionNftLink={(_, i) => CollectionRoutes.EDIT_NFT_CREATE_COLLECTION.replace(":index", i.toString())}
            >
                {{
                    header: <EditNftCreationPageHeader saving={savingNft} />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default EditCollectionNftDraftPage;
