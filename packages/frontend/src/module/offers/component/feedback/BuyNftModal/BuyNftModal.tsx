import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TabsModal from "module/common/component/feedback/TabsModal/TabsModal";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";
import { NftDto } from "module/api/service";
import NftCheckoutTab from "../../display/NftCheckoutTab/NftCheckoutTab";
import BuyNftModalActions from "./BuyNftModalActions/BuyNftModalActions";

export interface BuyNftModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

const BuyNftModal = createModal<BuyNftModalProps>(({ nft, ...modalProps }) => {
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
            title={"Buy NFT"}
            closable={!loading}
            {...modalProps}
            tabs={[
                {
                    content: <NftCheckoutTab nft={nft} />,
                },
                {
                    content: (
                        <BuyNftModalActions
                            isLoading={loading}
                            onStart={() => setLoading(true)}
                            onEnd={() => setLoading(false)}
                            onSuccess={handleOnSuccess}
                        />
                    ),
                },
            ]}
        />
    );
});

export default BuyNftModal;
