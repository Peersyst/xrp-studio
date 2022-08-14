import { useRecoilValue } from "recoil";
import { walletState } from "module/wallet/state/WalletState";
import { Row, Typography } from "@peersyst/react-components";
import ConnectXummButton from "module/wallet/component/input/ConnectXummButton/ConnectXummButton";
import useTranslate from "module/common/hook/useTranslate";

const Wallet = (): JSX.Element => {
    const { isLogged } = useRecoilValue(walletState);
    const translate = useTranslate();

    return isLogged ? (
        <></>
    ) : (
        <Row gap="1rem" alignItems="center">
            <Typography variant="body1" fontWeight={500} light>
                {translate("letsGetStarted")}
            </Typography>
            <ConnectXummButton />
        </Row>
    );
};

export default Wallet;
