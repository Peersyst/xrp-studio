import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { publish, isPublishing } = usePublishNft(request, draftId);
    const [isPooling, setIsPooling] = useState(true);

    const { metadata: { image: nftImage = "" } = {} } = request;

    const handlePublish: ActionFn = ({ next }) => {
        publish();
        next();
    };

    const handleClose: ActionFn = ({ close }) => {
        close();
        navigate(NftRoutes.MY_NFTS);
    };

    const steps = [
        {
            title: translate("approveXRPStudio"),
            description: translate("approveXRPStudioDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("confirmCreation"),
            description: translate("confirmCreationDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
            execution: async () => {
                return undefined;
            },
        },
    ];

    return (
        <ActionModal title={translate("publishConfirmation")} closable={!isPublishing && !isPooling} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftInformation request={request} collection={collection} />,
                        actions: [{ action: handlePublish }, { action: "close", label: translate("cancel") }],
                    },
                    {
                        content: <NftPublishActions steps={steps} onSuccess={() => setIsPooling(false)} />,
                        actions: [
                            { action: "next", disabled: isPooling, label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: <NftPublishSuccess />,
                        actions: [{ action: handleClose, label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftPublishModal;
