import { Typography } from "@peersyst/react-components";
import ConnectXummButton from "module/wallet/component/input/ConnectXummButton/ConnectXummButton";
import useTranslate from "module/common/hook/useTranslate";
import { WalletNotConnectedRoot } from "./WalletNotConnected.styles";

const WalletNotConnected = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <WalletNotConnectedRoot gap="1rem" alignItems="center">
            <Typography variant="body1" fontWeight={500} light className="get-started-text">
                {translate("letsGetStarted")}
            </Typography>
            <ConnectXummButton />
        </WalletNotConnectedRoot>
    );
};

export default WalletNotConnected;
