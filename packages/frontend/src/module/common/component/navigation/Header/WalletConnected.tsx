import LinkHeader from "module/common/component/navigation/Header/LinkHeader/LinkHeader";
import { WalletRoot } from "module/common/component/navigation/Header/Wallet.styles";

const WalletConnected = (): JSX.Element => (
    <WalletRoot gap={26}>
        <LinkHeader to="/nfts"> My NFTs </LinkHeader>
        <LinkHeader to="/wallet"> My Wallet </LinkHeader>
        <LinkHeader to="/profile"> @username </LinkHeader>
    </WalletRoot>
);

export default WalletConnected;
