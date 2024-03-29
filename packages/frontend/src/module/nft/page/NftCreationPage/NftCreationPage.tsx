import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { useSearchParams } from "react-router-dom";
import useGetNftDraft from "module/nft/query/useGetNftDraft";
import NftCreationPageHeader from "module/nft/component/layout/NftCreationPageHeader/NftCreationPageHeader";
import { Form, useModal, useToast } from "@peersyst/react-components";
import { NftCreationForm } from "module/nft/types";
import useCreateNftDraft from "module/nft/query/useCreateNftDraft";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { useGetMyCollections } from "module/collection/query/useGetMyCollections";
import { usePaginatedList } from "@peersyst/react-hooks";
import useNftCreationPageSlots from "module/nft/page/NftCreationPage/hook/useNftCreationPageSlots";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useEffect, useMemo } from "react";
import useWallet from "module/wallet/hook/useWallet";
import useTranslate from "module/common/hook/useTranslate";
import useGetNftDrafts from "module/nft/query/useGetNftDrafts";

const NftCreationPage = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const [searchParams, setSearchParams] = useSearchParams();
    const { showModal } = useModal();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const nfrDraftId = searchParams.get("id");
    const { data: nftDraft, isLoading: nftDraftLoading } = useGetNftDraft(nfrDraftId ? Number(nfrDraftId) : undefined);

    const hasCollection = !!nftDraft?.collection;
    const { data: collectionNftsData, isLoading: loadingCollectionNfts } = useGetNftDrafts(
        { collections: [nftDraft?.collection?.id || 0] },
        { enabled: hasCollection },
    );
    const collectionNfts = usePaginatedList(collectionNftsData?.pages, (page) => page.items);
    const collectionNftDrafts = useMemo(
        () => collectionNfts.filter((nft) => nft.status !== "confirmed" && nft.status !== "pending"),
        [collectionNftsData],
    );

    const { data: { pages = [] } = {}, isLoading: collectionsLoading } = useGetMyCollections();
    const collections = usePaginatedList(pages, (page) => page.items);

    const isLoading = nftDraftLoading || collectionsLoading;

    const { mutateAsync: createNftDraft, isLoading: createNftDraftLoading } = useCreateNftDraft();
    const { isLoading: createNftLoading } = useCreateNft();
    const { mutateAsync: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const saving = createNftDraftLoading || (updateNftDraftLoading && !variables?.publish);
    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);
    const { address: userAddress } = useWallet();

    useEffect(() => {
        if (nftDraft && nftDraft?.user?.address !== userAddress) {
            showToast(translateError("nftNotOwned"), { type: "warning" });
            searchParams.delete("id");
            setSearchParams(searchParams);
        } else if (nfrDraftId !== null && !nftDraftLoading && !nftDraft) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }, [nftDraftLoading, nftDraft]);

    const handleSubmit = async (data: NftCreationForm, action: string | undefined) => {
        const requestNft = createNftRequestFromForm(data);
        const collection = collections.find((el) => el.taxon === requestNft.taxon);
        if (action === "publish" && requestNft) {
            showModal(NftPublishModal, { request: requestNft, collection: collection?.name, draftId: nftDraft?.id });
        } else if (action === "save") {
            /* After this line, you are saving */
            if (nftDraft) {
                await updateNftDraft({ id: nftDraft.id, publish: false, ...requestNft }).catch();
            } else {
                await createNftDraft(requestNft).catch();
            }
            showToast(translate("nftDraftSaved"), { type: "success" });
            navigate(NftRoutes.MY_NFTS, { replace: true });
        }
    };

    const slots = useNftCreationPageSlots({ nft: nftDraft, collections, loading: isLoading });

    return (
        <Form onSubmit={handleSubmit}>
            <BaseNftPage
                collectionNfts={collectionNftDrafts}
                loadingCollectionNfts={loadingCollectionNfts}
                collectionNftLink={(nft) => `${NftRoutes.NFT_CREATION}?id=${nft.id}`}
                activeCarouselNftId={nftDraft?.id}
            >
                {{
                    header: <NftCreationPageHeader loading={isLoading} saving={saving} publishing={publishing} />,
                    content: slots,
                }}
            </BaseNftPage>
        </Form>
    );
};

export default NftCreationPage;
