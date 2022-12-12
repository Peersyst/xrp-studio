import { Row, Toolbar } from "@peersyst/react-components";
import { AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";
import Wallet from "module/wallet/component/core/Wallet/Wallet";
import { Fragment } from "react";
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
                    <Row gap={24} alignItems="center" justifyContent="space-between">
                        <Fragment>
                            {!isMobile ? (
                                <>
                                    <MenuLinks />
                                </>
                            ) : undefined}
                        </Fragment>
                        <Wallet />
                        <HeaderMenuButton />
                    </Row>
                </Row>
            </Toolbar>
        </AppBarRoot>
    );
};

export default AppBar;
