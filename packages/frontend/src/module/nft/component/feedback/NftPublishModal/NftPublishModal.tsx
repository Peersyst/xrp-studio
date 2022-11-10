import { createModal } from "@peersyst/react-components";
import PublishModal from "module/common/component/feedback/PublishModal/PublishModal";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";

const NftPublishModal = createModal((modalProps) => {
    return (
        <PublishModal title={"Publish summary"} {...modalProps}>
            {{
                cover: <NftCoverImage src={""} alt={""} loading={true} />,
                information: <NftInformation />,
            }}
        </PublishModal>
    );
});

export default NftPublishModal;
