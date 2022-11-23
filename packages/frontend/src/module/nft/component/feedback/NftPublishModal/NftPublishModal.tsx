import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { publish, isPublishing } = usePublishNft(request, draftId);

    const mockError = true;

    const { metadata: { image: nftImage = "" } = {} } = request;

    const handlePublish: ActionFn = ({ next }) => {
        publish();
        next();
    };

    const handleCloseSuccessfully: ActionFn = ({ close }) => {
        close();
        navigate(NftRoutes.MY_NFTS);
    };

    return (
        <ActionModal title={translate("publishConfirmation")} closable={!isPublishing} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftInformation request={request} collection={collection} />,
                        actions: [
                            { action: handlePublish, label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: <NftPublishActions />,
                        actions: [
                            { action: "next", label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: mockError ? <NftPublishError /> : <NftPublishSuccess />,
                        actions: [{ action: handleCloseSuccessfully, label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftPublishModal;
