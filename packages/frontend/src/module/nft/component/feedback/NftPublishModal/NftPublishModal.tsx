import { createModal, useToast } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { capitalize } from "@peersyst/react-utils";
import NftPublishContent from "module/nft/component/feedback/NftPublishModal/PublishContent/PublishContent";
import { useRecoilValue } from "recoil";
import publishNftState from "module/nft/state/PublishNftState";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const checkBalance = useCheckBalance();
    const { data: requestNft, nftDraftId: nftDraftId } = useRecoilValue(publishNftState);

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const handleSubmit = async () => {
        const hasBalance = await checkBalance();
        if (!hasBalance) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            if (nftDraftId) {
                updateNftDraft({ id: nftDraftId, publish: true, ...requestNft });
            } else {
                createNft(requestNft);
            }
        }
    };

    return (
        <PublishModal title={translate("publishConfirmation")} {...modalProps}>
            {{
                content: <NftPublishContent cover={requestNft.metadata!.image} feedback={<NftPublishTabs />} />,
                action: (
                    <Button onClick={handleSubmit} action="confirm-publish" size="lg" variant="primary" loading={publishing}>
                        {capitalize(translate("confirm"))}
                    </Button>
                ),
            }}
        </PublishModal>
    );
});

export default NftPublishModal;
