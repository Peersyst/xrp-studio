import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { useSearchParams } from "react-router-dom";
import useGetNftDraft from "module/nft/query/useGetNftDraft";
import NftCreationPageHeader from "module/nft/component/layout/NftCreationPageHeader/NftCreationPageHeader";
import { Form } from "@peersyst/react-components";
import { NftCreationForm } from "module/nft/types";
import useCreateNftDraft from "module/nft/query/useCreateNftDraft";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { useGetMyCollections } from "module/collection/query/useGetMyCollections";
import { usePaginatedList } from "@peersyst/react-hooks";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";

const NftCreationPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const nfrDraftId = searchParams.get("id");
    const { data: nftDraft, isLoading: nftDraftLoading } = useGetNftDraft(nfrDraftId ? Number(nfrDraftId) : undefined);
    const { data: { pages = [] } = {}, isLoading: collectionsLoading } = useGetMyCollections();
    const collections = usePaginatedList(pages, (page) => page.items);
    const isLoading = nftDraftLoading || collectionsLoading;
    const navigate = useNavigate();

    const { mutate: createNftDraft, isLoading: createNftDraftLoading } = useCreateNftDraft();
    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const saving = createNftDraftLoading || (updateNftDraftLoading && !variables?.publish);
    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const goToMyNfts = () => async () => {
        navigate(NftRoutes.MY_NFTS, { replace: true });
    };

    const handleSubmit = (data: NftCreationForm, action: string | undefined) => {
        const requestNft = createNftRequestFromForm(data);
        if (nftDraft) {
            updateNftDraft(
                { id: nftDraft.id, publish: action === "publish", ...requestNft },
                {
                    onSuccess: goToMyNfts(),
                },
            );
        } else {
            if (action === "publish") {
                createNft(requestNft, {
                    onSuccess: goToMyNfts(),
                });
            } else {
                createNftDraft(requestNft, {
                    onSuccess: goToMyNfts(),
                });
            }
        }
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
