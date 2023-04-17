import { createModal } from "@peersyst/react-components";
import { useState } from "react";
import TabsModal from "module/common/component/feedback/TabsModal/TabsModal";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";
import { NftDto, OfferDto } from "module/api/service";
import NftCheckoutTab from "../../display/NftCheckoutTab/NftCheckoutTab";
import BuyNftModalActions from "./BuyNftModalActions/BuyNftModalActions";
import useTranslate from "module/common/hook/useTranslate";

export enum BuyNftModalType {
    BUY = "buy",
    ACCEPT_TRANSFER = "accept-transfer",
}

export interface BuyNftModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    offer: OfferDto;
    type: BuyNftModalType;
}

const BuyNftModal = createModal<BuyNftModalProps>(({ nft, offer, type, ...modalProps }) => {
    const [loading, setLoading] = useState<boolean>();
    const translate = useTranslate();

    return (
        <TabsModal
            gap="2.25rem"
            size="md"
            title={translate("checkout")}
            closable={!loading}
            {...modalProps}
            tabs={[
                {
                    content: <NftCheckoutTab nft={nft} amount={offer.amount || "0"} type={type} />,
                },
                {
                    content: (
                        <BuyNftModalActions
                            offer={offer}
                            type={type}
                            nft={nft}
                            isLoading={loading}
                            onStart={() => setLoading(true)}
                            onEnd={() => setLoading(false)}
                        />
                    ),
                },
            ]}
        />
    );
});

export default BuyNftModal;
