import Link from "module/common/component/navigation/Header/Link/Link";
import { WalletRoot } from "module/common/component/navigation/Header/Wallet.styles";
import { image } from "asset";

const WalletConnected = (): JSX.Element => (
    <WalletRoot gap={26}>
        <Link to="/nfts"> My NFTs </Link>
        <Link to="/wallet">
            <img src={image.wallet} alt="wallet" style={{ marginRight: "12px" }} />
            My Wallet
        </Link>
        <Link to="/profile"> @username </Link>
    </WalletRoot>
);

export default WalletConnected;
