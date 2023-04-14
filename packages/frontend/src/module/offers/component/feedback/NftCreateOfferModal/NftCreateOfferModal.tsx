import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { useState } from "react";
import NftMakeOfferForm from "../../../../nft/component/input/NftMakeOfferForm/NftMakeOfferForm";
import TabsModal from "module/common/component/feedback/TabsModal/TabsModal";
import { NftCreateOfferModalProps } from "./NftCreateOfferModal.types";
import NftCreateOfferActions from "./NftCreateOfferActions/NftCreateOfferActions";

const NftCreateOfferModal = createModal<NftCreateOfferModalProps>(({ ...modalProps }) => {
    const translate = useTranslate();

    const [loading, setLoading] = useState<boolean>();

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
                    content: <NftCreateOfferActions isLoading={loading} onStart={() => setLoading(true)} onEnd={() => setLoading(false)} />,
                },
            ]}
        />
    );
});

export default NftCreateOfferModal;
