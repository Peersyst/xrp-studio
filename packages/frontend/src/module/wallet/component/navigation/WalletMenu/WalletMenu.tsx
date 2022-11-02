import { Col, Divider } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useResetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { WalletMenuRoot, BaseLink, CardContent } from "./WalletMenu.styles";
import useWallet from "module/wallet/component/hooks/useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { UserRoutes } from "module/user/UserRouter";
import { BaseRoutes } from "../../../../../Router";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export interface WalletMenuProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
}

const WalletMenu = ({ setVisible }: WalletMenuProps): JSX.Element => {
    const translate = useTranslate();
    const { address = "" } = useWallet();
    const resetWalletState = useResetRecoilState(walletState);
    const navigate = useNavigate();

    const logout = () => {
        AuthTokenStorage.clear();
        resetWalletState();
    };

    const handleNavigate = (path: string) => {
        setVisible(false);
        navigate(path);
    };

    return (
        <WalletMenuRoot>
            <Col gap="1rem">
                <CardContent gap="1rem">
                    <BaseLink onClick={() => handleNavigate(UserRoutes.PROFILE.replace(":address", address))}>
                        {translate("profile")}
                    </BaseLink>
                    <BaseLink onClick={() => handleNavigate(UserRoutes.SETTINGS)}>{translate("settings")}</BaseLink>
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
