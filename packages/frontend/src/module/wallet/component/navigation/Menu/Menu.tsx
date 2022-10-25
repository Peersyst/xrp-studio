import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useSetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { CardRoot, BaseLink } from "./Menu.styles";

const Menu = (): JSX.Element => {
    const t = useTranslate();
    const setWalletState = useSetRecoilState(walletState);

    const logout = () => {
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
                    <BaseLink to="/profile">{t("profile")}</BaseLink>
                    <BaseLink to="/settings">{t("settings")}</BaseLink>
                    <WalletCard />
                </Col>
                <FiltersDivider />
                <Col className="Content">
                    <BaseLink as={"a"} onClick={() => logout()}>
                        {t("logout")}
                    </BaseLink>
                </Col>
            </Col>
        </CardRoot>
    );
};

export default Menu;
