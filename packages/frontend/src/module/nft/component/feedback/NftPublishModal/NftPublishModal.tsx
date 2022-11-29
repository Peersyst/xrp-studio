import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import { config } from "config";
import { NftPublishModalCoverImage } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.styles";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";
import NftPublishInformation from "module/nft/component/feedback/NftPublishModal/NftPublishInformation/NftPublishInformation";
import { useState } from "react";

const NftPublishModal = createModal<NftPublishModalProps>(({ request, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();
    const [nftId, setNftId] = useState<number>();

    const { metadata: { image: nftImage = "" } = {} } = request;

    const handleCloseSuccessfully = () => {
        navigate(NftRoutes.MY_NFTS);
    };

    const handleError = (e: unknown) => {
        setError(e);
    };

    return (
        <ActionModal title={translate("publishNftConfirmation")} closable={!loading} {...modalProps}>
            {{
                cover: <NftPublishModalCoverImage src={nftImage} fallback={config.nftDefaultCoverUrl} alt="nft-image" />,
                tabs: [
                    {
                        content: <NftPublishInformation request={request} collection={collection} />,
                        actions: [
                            { action: "next", label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: (
                            <NftPublishActions
                                onStart={() => setLoading(true)}
                                onEnd={() => setLoading(false)}
                                onSuccess={handleCloseSuccessfully}
                                onError={handleError}
                                onPollingEnd={setNftId}
                                request={request}
                                draftId={draftId}
                            />
                        ),
                        actions: [
                            { action: "next", disabled: loading, label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: error ? <NftPublishError error={error} /> : <NftPublishSuccess id={nftId} />,
                        actions: [{ action: handleCloseSuccessfully, label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftPublishModal;
