import EditNftCreationPageHeader from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { Form } from "@peersyst/react-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NftCreationForm } from "module/nft/types";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { CollectionRoutes } from "module/collection/CollectionRouter";

const EditCollectionNftDraftPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const nftDraftIndex = searchParams.get("index");
    const [collectionCreationState, setCollectionCreationState] = useCollectionCreationState();
    const nfts = collectionCreationState.nfts;
    const nft = nfts[Number(nftDraftIndex)];
    const slots = useNftCreationPageSlots({ nft, fixedCollection: true });

    if (!nftDraftIndex && !(Number(nftDraftIndex) in nfts)) {
        navigate(CollectionRoutes.CREATE_COLLECTION);
    }

    const handleSubmit = (data: NftCreationForm) => {
        const requestNft = createNftRequestFromForm(data);
        setCollectionCreationState({
            nfts: { ...collectionCreationState.nfts, [Number(nftDraftIndex)]: requestNft },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BaseNftPage>
                {{
                    header: <EditNftCreationPageHeader />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default EditCollectionNftDraftPage;
