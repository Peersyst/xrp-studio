import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { useSearchParams } from "react-router-dom";
import useGetNftDraft from "module/nft/query/useGetNftDraft";
import NftCreationPageHeader from "module/nft/component/layout/NftCreationPageHeader/NftCreationPageHeader";
import { Form, useToast, useModal } from "@peersyst/react-components";
import { NftCreationForm } from "module/nft/types";
import useCreateNftDraft from "module/nft/query/useCreateNftDraft";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { useGetMyCollections } from "module/collection/query/useGetMyCollections";
import { usePaginatedList } from "@peersyst/react-hooks";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";

const NftCreationPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const { showModal } = useModal();
    const nfrDraftId = searchParams.get("id");
    const { data: nftDraft, isLoading: nftDraftLoading } = useGetNftDraft(nfrDraftId ? Number(nfrDraftId) : undefined);
    const { data: { pages = [] } = {}, isLoading: collectionsLoading } = useGetMyCollections();
    const collections = usePaginatedList(pages, (page) => page.items);
    const isLoading = nftDraftLoading || collectionsLoading;
    const navigate = useNavigate();

    const { mutate: createNftDraft, isLoading: createNftDraftLoading } = useCreateNftDraft();
    const { isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const saving = createNftDraftLoading || (updateNftDraftLoading && !variables?.publish);
    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const handleSubmit = (data: NftCreationForm, action: string | undefined) => {
        const requestNft = createNftRequestFromForm(data);
        if (action === "publish" && requestNft) showModal(NftPublishModal, { requestNft: requestNft, action, nftDraft });
        /* After this line, you are saving */
        if (nftDraft) {
            updateNftDraft({ id: nftDraft.id, publish: false, ...requestNft });
        } else {
            createNftDraft(requestNft);
        }
        navigate(NftRoutes.MY_NFTS, { replace: true });
    };

    const slots = useNftCreationPageSlots({ nft: nftDraft, collections, loading: isLoading });

    return (
        <Form onSubmit={handleSubmit}>
            <BaseNftPage>
                {{
                    header: <NftCreationPageHeader loading={isLoading} saving={saving} publishing={publishing} />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default NftCreationPage;
