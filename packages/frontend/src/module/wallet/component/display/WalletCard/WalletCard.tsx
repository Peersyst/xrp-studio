import { BlockchainAddress, Col, Typography } from "@peersyst/react-components";
import { useGetXrpBalance } from "../../hooks/useGetXrpBalance/useGetXrpBalance";
import useWallet from "../../hooks/useWallet";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { WalletCardRoot } from "./WalletCard.styles";
import { config } from "config";
import { useGetXrpTokenPrice } from "../../hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import { FiatCurrencyType } from "module/wallet/types";
import { useGetTokenPriceBalance } from "../../hooks/useGetTokenPriceBalance/useGetTokenPriceBalance";

const WalletCard = (): JSX.Element => {
    const { address } = useWallet();
    const { data: availableBalance } = useGetXrpBalance();
    const currency: FiatCurrencyType = config.currencyTokenPrice;
    const { data: tokenValue } = useGetXrpTokenPrice(currency);
    return (
        <WalletCardRoot>
            <Col gap={15}>
                <BlockchainAddress address={address as string} type="address" length={12} variant="caption" light />
                <Col gap={10}>
                    <Typography variant="h5">{availableBalance}</Typography>
                    <Typography variant="caption">{`( =  ${useGetTokenPriceBalance(
                        Number(tokenValue),
                        Number(availableBalance),
                    )} ${currency} )`}</Typography>
                </Col>
                <NetworkConnect />
            </Col>
        </WalletCardRoot>
    );
};

export default WalletCard;
