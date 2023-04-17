import { Col } from "@peersyst/react-components";
import clsx from "clsx";
import { NftDto } from "module/api/service";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import useGoToNextTab from "module/common/component/feedback/TabsModal/hooks/useGoToNextTab";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useTranslate from "module/common/hook/useTranslate";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { useGetXrpBalance } from "module/wallet/hook/useGetXrpBalance/useGetXrpBalance";
import { BuyNftModalType } from "../../feedback/BuyNftModal/BuyNftModal";
import NftCheckoutAlert from "../../feedback/NftCheckoutAlert/NftCheckoutAlert";
import NftCheckoutCardPrice from "../NftCheckoutCardPrice/NftCheckoutCardPrice";
import NftCheckoutInfo from "../NftCheckoutInfo/NftCheckoutInfo";

export interface NftCheckoutTabProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    amount: string;
    fee?: string;
    type: BuyNftModalType;
}

function canCheckoutNft(amountInDrops: string, xrpBalance: string | number): boolean {
    return BigInt(XrplService.xrpToDrops(String(xrpBalance))) >= BigInt(amountInDrops);
}

function NftCheckoutTab({ className, nft, amount, fee, type, ...rest }: NftCheckoutTabProps): JSX.Element {
    const translate = useTranslate();
    const goToNextTab = useGoToNextTab();
    const { data: xrpBalance = 0 } = useGetXrpBalance();
    const canBuyNft = canCheckoutNft(amount, xrpBalance);

    return (
        <Col gap="2.25rem" className={clsx("nft-checkout-tab", className)} {...rest}>
            <NftCheckoutAlert hasBalance={!canBuyNft} />
            <NftCheckoutInfo nft={nft} />
            <NftCheckoutCardPrice amount={amount} fee={fee} />
            <TabsModalFooter
                mainLabel={translate(type === BuyNftModalType.BUY ? "buyNow" : "acceptTransfer")}
                cancelLabel={translate(canBuyNft ? "cancel" : "close")}
                mainDisabled={!canBuyNft}
                onSubmit={goToNextTab}
            />
        </Col>
    );
}

export default NftCheckoutTab;
