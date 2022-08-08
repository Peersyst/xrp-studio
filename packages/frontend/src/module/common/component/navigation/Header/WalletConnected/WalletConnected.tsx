import { Row } from "@peersyst/react-components";
import styled from "styled-components";
import LinkHeader from "module/common/component/navigation/Header/LinkHeader/LinkHeader";

const WalletConnectedRoot = styled(Row).attrs({ position: "fixed" })`
    display: flex;
    padding-right: 10rem;
`;

const WalletConnected = (): JSX.Element => (
    <WalletConnectedRoot gap={26}>
        <LinkHeader to="/nfts"> My NFTs </LinkHeader>
        <LinkHeader to="/wallet"> My Wallet </LinkHeader>
        <LinkHeader to="/profile"> @username </LinkHeader>
    </WalletConnectedRoot>
);

export default WalletConnected;
