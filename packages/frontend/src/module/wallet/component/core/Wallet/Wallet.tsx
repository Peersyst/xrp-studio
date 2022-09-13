import { Typography } from "@peersyst/react-components";
import ConnectXummButton from "module/wallet/component/input/ConnectXummButton/ConnectXummButton";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/component/hooks/useWallet";
import { WalletNotConnected } from "./Wallet.styles";

const Wallet = (): JSX.Element => {
    const { isLogged } = useWallet();
    const translate = useTranslate();

    return isLogged ? (
        <></>
    ) : (
        <WalletNotConnected gap="1rem" alignItems="center">
            <Typography variant="body1" fontWeight={500} light className="get-started-text">
                {translate("letsGetStarted")}
            </Typography>
            <ConnectXummButton />
        </WalletNotConnected>
    );
};

export default Wallet;
