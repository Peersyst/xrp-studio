import Button from "module/common/component/input/Button/Button";
import { WalletRoot } from "module/common/component/navigation/Header/Wallet.styles";
import Link from "module/common/component/navigation/Header/Link/Link";

const WalletNotConnected = (): JSX.Element => (
    <WalletRoot gap={26}>
        <Link to="/"> Let's get started! </Link>
        <Button> Login with your XUMM wallet </Button>
    </WalletRoot>
);

export default WalletNotConnected;
