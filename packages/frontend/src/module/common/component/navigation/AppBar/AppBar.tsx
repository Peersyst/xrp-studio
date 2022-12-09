import { Row, Toolbar, Typography } from "@peersyst/react-components";
import { AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";
import Wallet from "module/wallet/component/core/Wallet/Wallet";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import useWallet from "module/wallet/hook//useWallet";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import useTranslate from "module/common/hook/useTranslate";
import { APPBAR_TABS } from "module/common/component/navigation/AppBar/AppBarTabs";
import useIsMobile from "module/common/hook/useIsMobile";

const AppBar = (): JSX.Element => {
    const location = useLocation();
    const { isLogged } = useWallet();
    const translate = useTranslate();

    const isMobile = useIsMobile();
    return (
        <AppBarRoot>
            <Toolbar>
                <Row flex={1} alignItems="center" justifyContent="space-between">
                    <Logo fullSize={!isMobile} />
                    <Row gap={24} alignItems="center" justifyContent="space-between">
                        {isLogged ? (
                            <Fragment>
                                {APPBAR_TABS.map((item) => (
                                    <ConditionalLink key={item.label} condition={isLogged} to={item.path}>
                                        <Typography
                                            variant="body1"
                                            color={location.pathname.includes(item.path) ? "black.0" : "black.40"}
                                            fontWeight={500}
                                        >
                                            {translate(item.label)}
                                        </Typography>
                                    </ConditionalLink>
                                ))}
                            </Fragment>
                        ) : undefined}
                        <Wallet />
                    </Row>
                </Row>
            </Toolbar>
        </AppBarRoot>
    );
};

export default AppBar;
