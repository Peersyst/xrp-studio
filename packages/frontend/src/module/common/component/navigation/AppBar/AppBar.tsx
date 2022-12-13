import { Row, Toolbar } from "@peersyst/react-components";
import { AppBarContent, AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";
import Wallet from "module/wallet/component/core/Wallet/Wallet";
import useIsMobile from "module/common/hook/useIsMobile";
import HeaderMenuButton from "../HeaderMenuButton/HeaderMenuButton";
import MenuLinks from "../MenuLinks/MenuLinks";

const AppBar = (): JSX.Element => {
    const isMobile = useIsMobile();

    return (
        <AppBarRoot>
            <Toolbar>
                <Row flex={1} alignItems="center" justifyContent="space-between">
                    <Logo fullSize={!isMobile} />
                    <AppBarContent alignItems="center" justifyContent="space-between">
                        {!isMobile ? <MenuLinks /> : undefined}
                        <Wallet />
                        <HeaderMenuButton />
                    </AppBarContent>
                </Row>
            </Toolbar>
        </AppBarRoot>
    );
};

export default AppBar;
