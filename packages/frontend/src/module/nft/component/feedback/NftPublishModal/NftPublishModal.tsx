import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftPublishInformation from "module/nft/component/feedback/NftPublishModal/NftPublishInformation/NftPublishInformation";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const { publish } = usePublishNft(request, draftId);

    const { metadata: { image: nftImage = "" } = {} } = request;

    const handlePublish: ActionFn = ({ next }) => {
        publish();
        next();
    };

    return (
        <ActionModal title={translate("publishNftConfirmation")} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftPublishInformation request={request} collection={collection} />,
                        actions: [{ action: handlePublish }, { action: "close", label: translate("cancel") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftPublishModal;
