import { createModal } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";

const NftPublishModal = createModal<NftPublishModalProps>(({ requestNft, action, nftDraft, ...modalProps }) => {
    const translate = useTranslate();

    return (
        <PublishModal title={"Publish summary"} {...modalProps}>
            {{
                cover: (
                    <NftCoverImage src={requestNft.metadata!.image} alt="nft-image" loading={requestNft.metadata!.image === undefined} />
                ),
                information: <NftInformation data={requestNft} />,
                action: (
                    <Button size="lg" variant="primary">
                        {translate("publish")}
                    </Button>
                ),
            }}
        </PublishModal>
    );
});

export default NftPublishModal;
