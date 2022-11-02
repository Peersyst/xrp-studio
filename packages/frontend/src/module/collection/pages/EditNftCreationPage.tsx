import EditNftCreationPageHeader from "module/collection/component/layout/EditNftCreationPageHeader/EditNftCreationPageHeader";
import useNftCreationPageSlots from "module/nft/pages/NftCreationPage/hook/useNftCreationPageSlots";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { Form } from "@peersyst/react-components";
import { useSearchParams } from "react-router-dom";
import useGetNftDraft from "module/nft/query/useGetNftDraft";

const EditNftCreationPage = () => {
    const [searchParams] = useSearchParams();
    const nftDraftId = searchParams.get("id");
    const { data: nftDraft, isLoading: nftDraftLoading } = useGetNftDraft(nftDraftId ? Number(nftDraftId) : undefined);
    const slots = useNftCreationPageSlots({ nft: nftDraft, loading: nftDraftLoading });

    return (
        <Form onSubmit={() => undefined}>
            <BaseNftPage>
                {{
                    header: <EditNftCreationPageHeader />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default EditNftCreationPage;
