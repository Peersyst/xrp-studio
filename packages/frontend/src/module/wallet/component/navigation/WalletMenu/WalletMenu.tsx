import { Col, Divider } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useSetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { WalletMenuRoot, BaseLink, CardContent } from "./WalletMenu.styles";
import useWallet from "module/wallet/component/hooks/useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { UserRoutes } from "module/user/UserRouter";
import { BaseRoutes } from "../../../../../Router";

const WalletMenu = (): JSX.Element => {
    const translate = useTranslate();
    const { address = "" } = useWallet();
    const setWalletState = useSetRecoilState(walletState);

    const logout = () => {
        AuthTokenStorage.clear();
        setWalletState({
            isLogged: false,
            address: "",
            active: false,
        });
    };

    return (
        <WalletMenuRoot>
            <Col gap="1rem">
                <CardContent gap="1rem">
                    <BaseLink variant="body2" to={UserRoutes.PROFILE.replace(":address", address)} type="router">
                        {translate("profile")}
                    </BaseLink>
                    <BaseLink to={BaseRoutes.SETTINGS} type="router">
                        {translate("settings")}
                    </BaseLink>
                    <WalletCard />
                </CardContent>
                <Divider color={"black.70"} />
                <CardContent>
                    <BaseLink to={BaseRoutes.HOME} type="router" onClick={() => logout()}>
                        {translate("logout")}
                    </BaseLink>
                </CardContent>
            </Col>
        </WalletMenuRoot>
    );
};

export default WalletMenu;
