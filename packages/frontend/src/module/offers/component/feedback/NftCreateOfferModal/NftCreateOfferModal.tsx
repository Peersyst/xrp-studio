import useTranslate from "module/common/hook/useTranslate";
import { useState } from "react";
import NftMakeOfferForm from "../../input/NftMakeOfferForm/NftMakeOfferForm";
import TabsModal from "module/common/component/feedback/TabsModal/TabsModal";
import { NftCreateOfferModalProps } from "./NftCreateOfferModal.types";
import NftCreateOfferActions from "./NftCreateOfferActions/NftCreateOfferActions";
import useRefetchXrpBalance from "module/wallet/hook/useRefetchXrpBalance/useRefetchXrpBalance";

const NftCreateOfferModal = ({ nft, type, title, ...modalProps }: NftCreateOfferModalProps) => {
    const translate = useTranslate();
    const [loading, setLoading] = useState<boolean>();
    useRefetchXrpBalance();

    return (
        <TabsModal
            gap="2.25rem"
            size="md"
            title={title || translate("makeAnOffer")}
            closable={!loading}
            {...modalProps}
            tabs={[
                {
                    content: <NftMakeOfferForm offerType={type} />,
                },
                {
                    content: (
                        <NftCreateOfferActions
                            type={type}
                            nftId={nft.id}
                            isLoading={loading}
                            onStart={() => setLoading(true)}
                            onEnd={() => setLoading(false)}
                        />
                    ),
                },
            ]}
        />
    );
};

export default NftCreateOfferModal;
