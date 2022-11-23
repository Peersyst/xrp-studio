import { Col, Divider } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useResetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { WalletMenuRoot, WalletLink } from "./WalletMenu.styles";
import useWallet from "module/wallet/hook//useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { UserRoutes } from "module/user/UserRouter";
import { SettingsRoutes } from "module/settings/SettingsRouter";
import { MouseEventHandler } from "react";

const WalletMenu = (): JSX.Element => {
    const translate = useTranslate();
    const { address = "" } = useWallet();
    const resetWalletState = useResetRecoilState(walletState);

    const logout: MouseEventHandler = (e) => {
        e.preventDefault();
        AuthTokenStorage.clear();
        resetWalletState();
    };

    return (
        <WalletMenuRoot>
            <Col gap="1rem">
                <WalletLink to={UserRoutes.PROFILE.replace(":address", address)}>{translate("profile")}</WalletLink>
                <WalletLink to={SettingsRoutes.SETTINGS}>{translate("settings")}</WalletLink>
                <WalletCard />
                <Divider />
                <WalletLink to="" onClick={logout}>
                    {translate("logout")}
                </WalletLink>
            </Col>
        </WalletMenuRoot>
    );
};

export default WalletMenu;
