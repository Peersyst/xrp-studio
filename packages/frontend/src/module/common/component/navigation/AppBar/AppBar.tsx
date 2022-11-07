import { Row, Toolbar, Typography } from "@peersyst/react-components";
import { AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";
import Wallet from "module/wallet/component/core/Wallet/Wallet";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { NftRoutes } from "module/nft/NftRouter";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import useWallet from "module/wallet/component/hooks/useWallet";
import { Fragment } from "react";
import ThemeButton from "module/common/component/input/ThemeButton/ThemeButton";
import { useLocation } from "react-router-dom";

const AppBar = () => {
    const location = useLocation();
    const { isLogged } = useWallet();
    return (
        <AppBarRoot>
            <Toolbar>
                <Row flex={1} alignItems="center" justifyContent="space-between">
                    <Logo />
                    <Row gap={24} alignItems="center" justifyContent="space-between">
                        {isLogged ? (
                            <Fragment>
                                <ConditionalLink condition={isLogged} to={DashboardRoutes.MAIN}>
                                    <Typography variant="body1" light={location.pathname !== DashboardRoutes.MAIN}>
                                        Dashboard
                                    </Typography>
                                </ConditionalLink>
                                <ConditionalLink condition={isLogged} to={NftRoutes.MY_NFTS}>
                                    <Typography variant="body1" light={location.pathname !== NftRoutes.MY_NFTS}>
                                        My Nfts
                                    </Typography>
                                </ConditionalLink>
                                <ConditionalLink condition={isLogged} to={CollectionRoutes.MY_COLLECTIONS}>
                                    <Typography variant="body1" light={location.pathname !== CollectionRoutes.MY_COLLECTIONS}>
                                        My Drops
                                    </Typography>
                                </ConditionalLink>
                            </Fragment>
                        ) : undefined}
                        <ThemeButton size="sm" />
                        <Wallet />
                    </Row>
                </Row>
            </Toolbar>
        </AppBarRoot>
    );
};

export default AppBar;
