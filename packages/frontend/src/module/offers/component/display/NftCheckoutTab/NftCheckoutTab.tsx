import { Col } from "@peersyst/react-components";
import clsx from "clsx";
import config from "config/config";
import { NftDto } from "module/api/service";
import useGoToNextTab from "module/common/component/feedback/TabsModal/hooks/useGoToNextTab";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useTranslate from "module/common/hook/useTranslate";
import NftCheckoutInfo from "../NftCheckoutInfo/NftCheckoutInfo";
import NftCheckoutRowPrice from "./NftCheckoutRowPrice";
import { NftCheckoutCard } from "./NftCheckoutTab.styles";

export interface NftCheckoutTabProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

function NftCheckoutTab({ className, nft, ...rest }: NftCheckoutTabProps): JSX.Element {
    const translate = useTranslate();
    const goToNextTab = useGoToNextTab();

    return (
        <Col gap="2.25rem" className={clsx("nft-checkout-tab", className)} {...rest}>
            <NftCheckoutInfo nft={nft} />
            <NftCheckoutCard as={Col} gap="0.75rem">
                <NftCheckoutRowPrice variant="body1" label={translate("price")} balance={config.feeInDrops} />
                <NftCheckoutRowPrice variant="body1" label={translate("fee")} balance={config.feeInDrops} />
                <NftCheckoutRowPrice variant="body1" fontWeight="800" label={translate("total")} balance={"2"} />
            </NftCheckoutCard>
            <TabsModalFooter mainLabel={translate("buyNow")} onSubmit={goToNextTab} />
        </Col>
    );
}

export default NftCheckoutTab;
