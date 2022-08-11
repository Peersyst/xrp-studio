import Link from "module/common/component/navigation/Header/Link/Link";
import { WalletRoot } from "module/common/component/navigation/Header/Wallet.styles";

const WalletConnected = (): JSX.Element => (
    <WalletRoot gap={26}>
        <Link to="/nfts"> My NFTs </Link>
        <Link to="/wallet"> My Wallet </Link>
        <Link to="/profile"> @username </Link>
    </WalletRoot>
);

export default WalletConnected;
