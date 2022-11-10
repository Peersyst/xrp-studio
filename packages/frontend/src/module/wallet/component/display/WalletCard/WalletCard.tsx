import { BlockchainAddress, Col } from "@peersyst/react-components";
import { useGetXrpBalance } from "../../hooks/useGetXrpBalance/useGetXrpBalance";
import useWallet from "../../hooks/useWallet";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { WalletCardRoot } from "./WalletCard.styles";
import { useGetXrpTokenPrice } from "../../hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import Balance from "module/common/component/display/Balance/Balance";

const WalletCard = (): JSX.Element => {
    const { address = "" } = useWallet();
    const { data: availableBalance } = useGetXrpBalance();
    const { data: tokenValue } = useGetXrpTokenPrice();
    const fiatCurrencyBalance = (tokenValue ?? 0) * (availableBalance ?? 0);
    return (
        <WalletCardRoot>
            <Col gap="0.7rem" flex={1}>
                <BlockchainAddress address={address} type="address" variant="body2" light css={{ width: "100%" }} />
                <Col gap="0.3rem">
                    <Balance variant="body2" balance={availableBalance ?? 0} />
                    <Balance variant="caption2" balance={fiatCurrencyBalance} units="fiat" action="round" />
                </Col>
                <NetworkConnect />
            </Col>
        </WalletCardRoot>
    );
};

export default WalletCard;
