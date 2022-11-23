import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import usePublishNft from "module/nft/hook/usePublishNft";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { publish, startPolling, endPolling, onPollingError, isPublishing, isPolling, pollingError } = usePublishNft(request, draftId);

    const { metadata: { image: nftImage = "" } = {} } = request;

    const handleClose: ActionFn = ({ close }) => {
        close();
        navigate(NftRoutes.MY_NFTS);
    };

    const steps = [
        {
            title: translate("approveXRPStudio"),
            description: translate("approveXRPStudioDescription"),
            execution: () => publish(),
        },
        {
            title: translate("confirmCreation"),
            description: translate("confirmCreationDescription"),
            execution: () => startPolling(),
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
            execution: async () => {
                return;
            },
        },
    ];

    return (
        <ActionModal title={translate("publishConfirmation")} closable={!isPublishing && !isPolling} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftInformation request={request} collection={collection} />,
                        actions: [
                            { action: "next", label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: <NftPublishActions steps={steps} onSuccess={endPolling} onError={onPollingError} />,
                        actions: [
                            { action: "next", disabled: isPolling, label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: pollingError ? <NftPublishError errorMessage={pollingError} /> : <NftPublishSuccess />,
                        actions: [{ action: handleClose, label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftPublishModal;
