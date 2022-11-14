import { Col, Divider } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useResetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { WalletMenuRoot, BaseLink, CardContent } from "./WalletMenu.styles";
import useWallet from "module/wallet/hook//useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { UserRoutes } from "module/user/UserRouter";
import { useNavigate } from "react-router-dom";
import { SettingsRoutes } from "module/settings/SettingsRouter";

const WalletMenu = (): JSX.Element => {
    const translate = useTranslate();
    const { address = "" } = useWallet();
    const resetWalletState = useResetRecoilState(walletState);
    const navigate = useNavigate();

    const logout = () => {
        AuthTokenStorage.clear();
        resetWalletState();
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <WalletMenuRoot>
            <Col gap="1rem">
                <CardContent gap="1rem">
                    <BaseLink onClick={() => handleNavigate(UserRoutes.PROFILE.replace(":address", address))}>
                        {translate("profile")}
                    </BaseLink>
                    <BaseLink onClick={() => handleNavigate(SettingsRoutes.SETTINGS)}>{translate("settings")}</BaseLink>
                    <WalletCard />
                </CardContent>
                <Divider color={"black.70"} />
                <CardContent>
                    <BaseLink onClick={() => logout()}>{translate("logout")}</BaseLink>
                </CardContent>
            </Col>
        </WalletMenuRoot>
    );
};

export default WalletMenu;
