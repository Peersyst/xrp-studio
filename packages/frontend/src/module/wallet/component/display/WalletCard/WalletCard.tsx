import { BlockchainAddress, Col } from "@peersyst/react-components";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { WalletCardRoot } from "./WalletCard.styles";
import Balance from "module/common/component/display/Balance/Balance";
import { useGetXrpBalance } from "module/wallet/hook/useGetXrpBalance/useGetXrpBalance";
import { useGetXrpTokenPrice } from "module/wallet/hook/useGetXrpTokenPrice/useGetXrpTokenPrice";
import useWallet from "module/wallet/hook/useWallet";

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
