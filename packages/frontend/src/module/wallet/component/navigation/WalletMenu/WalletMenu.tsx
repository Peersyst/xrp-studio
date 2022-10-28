import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useSetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { CardRoot, BaseLink, CardContent } from "./WalletMenu.styles";
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
        <CardRoot>
            <Col gap="1.25rem">
                <CardContent gap="1rem">
                    <BaseLink to={UserRoutes.PROFILE.replace(":address", address)} type="router">
                        {translate("profile")}
                    </BaseLink>
                    <BaseLink to={BaseRoutes.SETTINGS} type="router">
                        {translate("settings")}
                    </BaseLink>
                    <WalletCard />
                </CardContent>
                <FiltersDivider />
                <CardContent>
                    <BaseLink to={BaseRoutes.HOME} type="router" onClick={() => logout()}>
                        {translate("logout")}
                    </BaseLink>
                </CardContent>
            </Col>
        </CardRoot>
    );
};

export default WalletMenu;
