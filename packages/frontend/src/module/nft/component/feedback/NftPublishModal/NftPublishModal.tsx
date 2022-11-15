import { createModal, useToast } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { capitalize } from "@peersyst/react-utils";
import NftPublishContent from "module/nft/component/feedback/NftPublishModal/NftPublishContent/NftPublishContent";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";

const NftPublishModal = createModal<NftPublishModalProps>(({ requestNft, nftDraft, collections, ...modalProps }) => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const checkBalance = useCheckBalance();

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const handleSubmit = async () => {
        const hasBalance = await checkBalance();
        if (!hasBalance) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            if (nftDraft) {
                updateNftDraft({ id: nftDraft.id, publish: true, ...requestNft });
            } else {
                createNft(requestNft);
            }
        }
    };

    return (
        <PublishModal title={translate("publishConfirmation")} {...modalProps}>
            {{
                content: (
                    <NftPublishContent
                        cover={
                            <NftCoverImage
                                src={requestNft.metadata!.image}
                                alt="nft-image"
                                loading={requestNft.metadata!.image === undefined}
                            />
                        }
                        info={<NftInformation data={requestNft} collections={collections} />}
                    />
                ),
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
