import { BlockchainAddress, Col, Typography } from "@peersyst/react-components";
import { useGetXrpBalance } from "../../hooks/useGetXrpBalance/useGetXrpBalance";
import useWallet from "../../hooks/useWallet";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { WalletCardRoot } from "./WalletCard.styles";
import { useGetXrpTokenPrice } from "../../hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import { useFormatBalance } from "module/common/component/display/Balance/hook/useFormatBalance";

const WalletCard = (): JSX.Element => {
    const { address } = useWallet();
    const { data: availableBalance } = useGetXrpBalance();
    const { data: tokenValue } = useGetXrpTokenPrice();
    const formatBalance = useFormatBalance();
    const fiatCurrencyBalance = (tokenValue ?? 0) * (availableBalance ?? 0);
    return (
        <WalletCardRoot>
            <Col gap="0.7rem" flex={1}>
                <BlockchainAddress address={address!} type="address" variant="body2" light css={{ width: "100%" }} />
                <Col gap="0.3rem">
                    <Typography variant="body2">{formatBalance(availableBalance ?? 0)}</Typography>
                    <Typography variant="caption" css={{ fontSize: "0.625rem" }}>{`( ${formatBalance(fiatCurrencyBalance, {
                        action: "round",
                        units: "fiat",
                    })} )`}</Typography>
                </Col>
                <NetworkConnect />
            </Col>
        </WalletCardRoot>
    );
};

export default WalletCard;
