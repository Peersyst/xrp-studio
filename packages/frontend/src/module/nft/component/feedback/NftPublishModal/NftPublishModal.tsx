import { createModal } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";

const NftPublishModal = createModal<NftPublishModalProps>((modalProps, { data, action, nftDraft }) => {
    return (
        <PublishModal title={"Publish summary"} {...modalProps}>
            {{
                cover: <NftCoverImage src={data.image} alt="nft-image" loading={true} />,
                information: <NftInformation />,
                action: undefined,
            }}
        </PublishModal>
    );
});

export default NftPublishModal;
