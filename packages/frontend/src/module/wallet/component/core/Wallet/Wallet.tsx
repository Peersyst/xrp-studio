import useWallet from "module/wallet/hook/useWallet";
import WalletConnected from "../WalletConnected/WalletConnected";
import WalletNotConnected from "../WalletNotConnected/WalletNotConnected";

const Wallet = (): JSX.Element => {
    const { isLogged } = useWallet();
    return isLogged ? <WalletConnected /> : <WalletNotConnected />;
};

export default Wallet;
