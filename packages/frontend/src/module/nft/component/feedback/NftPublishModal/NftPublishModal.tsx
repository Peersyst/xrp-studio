import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import usePublishNft from "module/nft/hook/usePublishNft";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";
import NftPublishInformation from "module/nft/component/feedback/NftPublishModal/NftPublishInformation/NftPublishInformation";
import useNftStatePolling from "module/nft/hook/useNftStatePolling";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { mutateAsync: publish, isLoading: isPublishing, data: responseId } = usePublishNft(request, draftId);
    const { mutateAsync: startPolling, isLoading: isPolling } = useNftStatePolling();

    const { metadata: { image: nftImage = "" } = {} } = request;

    const mockError = true;

    const handleCloseSuccessfully: ActionFn = ({ close }) => {
        close();
        navigate(NftRoutes.MY_NFTS);
    };

    return (
        <ActionModal title={translate("publishNftConfirmation")} closable={!isPublishing && !isPolling} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftPublishInformation request={request} collection={collection} />,
                        actions: [
                            { action: "next", disabled: isPublishing || isPolling, label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: <NftPublishActions calls={{ publish, startPolling }} responseId={responseId} />,
                        actions: [
                            { action: "next", disabled: isPublishing || isPolling, label: translate("viewDetails") },
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
