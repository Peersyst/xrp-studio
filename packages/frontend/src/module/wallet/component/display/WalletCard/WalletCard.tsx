import { BlockchainAddress, Col, Typography } from "@peersyst/react-components";
import { useGetXrpBalance } from "../../hooks/useGetXrpBalance/useGetXrpBalance";
import useWallet from "../../hooks/useWallet";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { WalletCardRoot } from "./WalletCard.styles";
import { useGetXrpTokenPrice } from "../../hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import { formatCurrency, formatNumber } from "module/common/util/format";
import { useRecoilState } from "recoil";
import { settingsState } from "module/settings/SettingsState";

const WalletCard = (): JSX.Element => {
    const { address } = useWallet();
    const { data: availableBalance } = useGetXrpBalance();
    const [settings] = useRecoilState(settingsState);
    const { data: tokenValue } = useGetXrpTokenPrice(settings.currency);
    const fiatCurrencyBalance = (tokenValue ?? 0) * (availableBalance ?? 0);
    return (
        <WalletCardRoot>
            <Col gap={15}>
                <BlockchainAddress address={address!} type="address" length={12} variant="caption" light />
                <Col gap={10}>
                    <Typography variant="h5">{formatNumber(availableBalance ?? 0)}</Typography>
                    <Typography variant="caption">{`( =  ${formatCurrency(fiatCurrencyBalance, settings.currency)} )`}</Typography>
                </Col>
                <NetworkConnect />
            </Col>
        </WalletCardRoot>
    );
};

export default WalletCard;
