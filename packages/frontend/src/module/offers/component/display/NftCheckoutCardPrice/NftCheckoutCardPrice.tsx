import { Col } from "@peersyst/react-components";
import clsx from "clsx";
import config from "config/config";
import useTranslate from "module/common/hook/useTranslate";
import { NftCheckoutCardPriceRoot } from "./NftCheckoutCardPrice.styles";
import NftCheckoutRowPrice from "./NftCheckoutRowPrice";
import { getTotalNftPrice } from "./utils/getTotalNftPrice";

export interface NftCheckoutCardPriceProps {
    className?: string;
    style?: React.CSSProperties;
    //In drops
    amount: number | string;
    //fee in drops
    fee?: number | string;
}

function NftCheckoutCardPrice({ className, fee = config.feeInDrops, amount, ...rest }: NftCheckoutCardPriceProps): JSX.Element {
    const translate = useTranslate();

    return (
        <NftCheckoutCardPriceRoot as={Col} gap="0.75rem" className={clsx("nft-checkout-card-price", className)} {...rest}>
            <NftCheckoutRowPrice variant="body1" label={translate("price")} balance={amount} />
            <NftCheckoutRowPrice variant="body1" label={translate("fee")} balance={fee} />
            <NftCheckoutRowPrice variant="body1" fontWeight="800" label={translate("total")} balance={getTotalNftPrice(amount, fee)} />
        </NftCheckoutCardPriceRoot>
    );
}

export default NftCheckoutCardPrice;
