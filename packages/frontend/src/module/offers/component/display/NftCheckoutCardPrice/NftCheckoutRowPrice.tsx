import { Row, TypographyProps, Typography } from "@peersyst/react-components";
import clsx from "clsx";
import config from "config/config";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import Balance from "module/common/component/display/Balance/Balance";
import { BalanceProps } from "module/common/component/display/Balance/Balance.types";

export interface NftCheckoutRowPriceProps extends Omit<TypographyProps, "children" | "light" | "textAlign"> {
    label: string;
    //In drops
    balance: BalanceProps["balance"];
}

function NftCheckoutRowPrice({ className, label, balance, ...rest }: NftCheckoutRowPriceProps): JSX.Element {
    return (
        <Row className={clsx("nft-checkout-row-price", className)} justifyContent="space-between">
            <Typography {...rest}>{label}</Typography>
            <Balance
                textAlign="end"
                balance={XrplService.dropsToXrp(balance.toString())}
                units={config.tokenName}
                unitsPosition="right"
                {...rest}
            />
        </Row>
    );
}

export default NftCheckoutRowPrice;
