import { Col } from "@peersyst/react-components";
import clsx from "clsx";
import { NftDto } from "module/api/service";
import useGoToNextTab from "module/common/component/feedback/TabsModal/hooks/useGoToNextTab";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useTranslate from "module/common/hook/useTranslate";
import NftCheckoutAlert from "../../feedback/NftCheckoutAlert/NftCheckoutAlert";
import NftCheckoutCardPrice from "../NftCheckoutCardPrice/NftCheckoutCardPrice";
import NftCheckoutInfo from "../NftCheckoutInfo/NftCheckoutInfo";

export interface NftCheckoutTabProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

function NftCheckoutTab({ className, nft, ...rest }: NftCheckoutTabProps): JSX.Element {
    const translate = useTranslate();
    const goToNextTab = useGoToNextTab();

    const canBuyNft = false;

    return (
        <Col gap="2.25rem" className={clsx("nft-checkout-tab", className)} {...rest}>
            <NftCheckoutAlert hasBalance={!canBuyNft} />
            <NftCheckoutInfo nft={nft} />
            <NftCheckoutCardPrice amount="10000" />
            <TabsModalFooter
                mainLabel={translate("buyNow")}
                cancelLabel={translate(canBuyNft ? "cancel" : "close")}
                mainDisabled={!canBuyNft}
                onSubmit={goToNextTab}
            />
        </Col>
    );
}

export default NftCheckoutTab;
