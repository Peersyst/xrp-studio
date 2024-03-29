import { Col, Divider, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { walletState } from "module/wallet/state/WalletState";
import { useResetRecoilState } from "recoil";
import WalletCard from "../../display/WalletCard/WalletCard";
import { WalletMenuRoot, WalletLink } from "./WalletMenu.styles";
import useWallet from "module/wallet/hook//useWallet";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { UserRoutes } from "module/user/UserRouter";
import { MouseEventHandler } from "react";
import useGetUser from "module/user/query/useGetUser";
import useIsMobile from "module/common/hook/useIsMobile";
import { useQueryClient } from "react-query";
import Queries from "../../../../../query/queries";
import { config } from "config";

const WalletMenu = (): JSX.Element => {
    const translate = useTranslate();
    const { address = "" } = useWallet();
    const { data: user } = useGetUser(address);
    const resetWalletState = useResetRecoilState(walletState);
    const queryClient = useQueryClient();

    const logout: MouseEventHandler = (e) => {
        e.preventDefault();
        AuthTokenStorage.clear();
        queryClient.invalidateQueries([Queries.MY_NFTS]);
        resetWalletState();
    };

    const isMobile = useIsMobile();

    return (
        <WalletMenuRoot>
            <Col gap="1rem">
                {isMobile && user?.name && (
                    <>
                        <Typography variant={"body2"}>@{user.name}</Typography>
                        <Divider />
                    </>
                )}
                <WalletLink type="router" to={UserRoutes.PROFILE.replace(":address", address)}>
                    {translate("profile")}
                </WalletLink>
                <WalletCard />
                <WalletLink type="href" to={config.altNetwork.url}>
                    {translate("switchTo", { destination: config.altNetwork.network })}
                </WalletLink>
                <Divider />
                <WalletLink to="" onClick={logout}>
                    {translate("logout")}
                </WalletLink>
            </Col>
        </WalletMenuRoot>
    );
};

export default WalletMenu;
