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
import { useGetMyCollections } from "module/nft/query/useGetMyCollections";
import { usePaginatedList } from "@peersyst/react-hooks";
import useNftCreationPageSlots from "module/nft/pages/NftCreationPage/hook/useNftCreationPageSlots";

const NftCreationPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const nfrDraftId = searchParams.get("id");
    const { data: nftDraft, isLoading: nftDraftLoading } = useGetNftDraft(nfrDraftId ? Number(nfrDraftId) : undefined);
    const { data: { pages = [] } = {}, isLoading: collectionsLoading } = useGetMyCollections();
    const collections = usePaginatedList(pages, (page) => page.items);
    const isLoading = nftDraftLoading || collectionsLoading;

    const { mutate: createNftDraft, isLoading: createNftDraftLoading } = useCreateNftDraft();
    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const saving = createNftDraftLoading || (updateNftDraftLoading && !variables?.publish);
    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const handleSubmit = (data: NftCreationForm, action: string) => {
        const requestNft = createNftRequestFromForm(data);
        if (nftDraft) {
            if (action === "publish") {
                updateNftDraft({ id: nftDraft.id, publish: true, ...requestNft });
            } else {
                updateNftDraft({ id: nftDraft.id, ...requestNft });
            }
        } else {
            if (action === "publish") {
                createNft(requestNft);
            } else {
                createNftDraft(requestNft);
            }
        }
    };

    const slots = useNftCreationPageSlots({ nft: nftDraft, collections, loading: isLoading });

    return (
        <Form onSubmit={handleSubmit as any}>
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
