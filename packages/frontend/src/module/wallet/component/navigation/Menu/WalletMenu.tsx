import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useSetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { CardRoot, BaseLink } from "./Menu.styles";
import useWallet from "module/wallet/component/hooks/useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { WalletRoutes } from "module/wallet/WalletRouter";

const WalletMenu = (): JSX.Element => {
    const translate = useTranslate();
    const { address } = useWallet();
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
                <Col className="Content" gap="1rem">
                    <BaseLink to={`${WalletRoutes.PROFILE}/${address}`} type="router">
                        {translate("profile")}
                    </BaseLink>
                    <BaseLink to={`${WalletRoutes.SETTINGS}`} type="router">
                        {translate("settings")}
                    </BaseLink>
                    <WalletCard />
                </Col>
                <FiltersDivider />
                <Col className="Content">
                    <BaseLink to="/" type="router" onClick={() => logout()}>
                        {translate("logout")}
                    </BaseLink>
                </Col>
            </Col>
        </CardRoot>
    );
};

export default WalletMenu;
