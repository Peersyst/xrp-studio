import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NftMakeOfferForm from "../../input/NftMakeOfferForm/NftMakeOfferForm";
import TabsModal from "module/common/component/feedback/TabsModal/TabsModal";
import { NftCreateOfferModalProps } from "./NftCreateOfferModal.types";
import NftCreateOfferActions from "./NftCreateOfferActions/NftCreateOfferActions";

const NftCreateOfferModal = createModal<NftCreateOfferModalProps>(({ ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();
    const [nftId, setNftId] = useState<number>();

    function handleOnSuccess(): void {
        console.log("Success");
    }

    return (
        <TabsModal
            gap="2.25rem"
            size="md"
            title={translate("makeAnOffer")}
            closable={!loading}
            {...modalProps}
            tabs={[
                {
                    content: <NftMakeOfferForm />,
                },
                {
                    content: (
                        <NftCreateOfferActions
                            isLoading={loading}
                            onStart={() => setLoading(true)}
                            onEnd={() => setLoading(false)}
                            onSuccess={handleOnSuccess}
                        />
                    ),
                },
                {
                    content: <>Success</>,
                },
            ]}
        />
    );
});

export default NftCreateOfferModal;
