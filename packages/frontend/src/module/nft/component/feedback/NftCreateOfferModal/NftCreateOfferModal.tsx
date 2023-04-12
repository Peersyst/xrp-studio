import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import { NftPublishModalProps } from "module/nft/component/feedback/NftPublishModal/NftPublishModal.types";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useState } from "react";
import NftMakeOfferForm from "../../input/NftMakeOfferForm/NftMakeOfferForm";

const NftCreateOfferModal = createModal<NftPublishModalProps>(({ request = {}, draftId, collection, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();
    const [nftId, setNftId] = useState<number>();

    const goMyNfts = () => {
        navigate(NftRoutes.MY_NFTS);
    };

    const handleError = (e: unknown) => {
        setError(e);
    };

    return (
        <ActionModal size="md" title={translate("makeAnOffer")} closable={!loading} {...modalProps}>
            {{
                tabs: [
                    {
                        content: <NftMakeOfferForm />,
                        actions: [
                            { action: "next", label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: <></>,
                        actions: [{ action: "next", disabled: loading || !!error, label: translate("viewDetails") }],
                    },
                    {
                        content: <></>,
                        actions: [{ action: "close", label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default NftCreateOfferModal;
