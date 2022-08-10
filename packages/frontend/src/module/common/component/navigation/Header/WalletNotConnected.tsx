import Button from "module/common/component/input/Button/Button";
import { WalletRoot } from "module/common/component/navigation/Header/Wallet.styles";
import LinkHeader from "module/common/component/navigation/Header/LinkHeader/LinkHeader";

const WalletNotConnected = (): JSX.Element => (
    <WalletRoot gap={26}>
        <LinkHeader to="/"> Let's get started! </LinkHeader>
        <Button> Login with your XUMM wallet </Button>
    </WalletRoot>
);

export default WalletNotConnected;
