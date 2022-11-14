import { createModal } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";

const NftPublishModal = createModal<NftPublishModalProps>(({ requestNft, action, nftDraft, ...modalProps }) => {
    const translate = useTranslate();

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);

    const handleSubmit = () => {
        if (nftDraft) {
            updateNftDraft({ id: nftDraft.id, publish: true, ...requestNft });
        } else {
            if (action === "confirm-publish") {
                createNft(requestNft);
            }
        }
    };

    return (
        <PublishModal title={"Publish summary"} {...modalProps}>
            {{
                cover: (
                    <NftCoverImage src={requestNft.metadata!.image} alt="nft-image" loading={requestNft.metadata!.image === undefined} />
                ),
                information: <NftInformation data={requestNft} />,
                action: (
                    <Button onClick={handleSubmit} size="lg" variant="primary" loading={publishing}>
                        {translate("publish")}
                    </Button>
                ),
            }}
        </PublishModal>
    );
});

export default NftPublishModal;
