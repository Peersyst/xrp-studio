import { Row } from "@peersyst/react-components";
import Link from "module/common/component/navigation/Link/Link";
import styled from "styled-components";

const WalletConnectedRoot = styled(Row).attrs({ position: "fixed" })`
    display: flex;
    padding-right: 10rem;
`;

const WalletConnected = (): JSX.Element => (
    <WalletConnectedRoot gap={26}>
        <Link to="/nfts"> My NFTs </Link>
        <Link to="/wallet"> My Wallet </Link>
        <Link to="/profile"> @username </Link>
    </WalletConnectedRoot>
);

export default WalletConnected;
