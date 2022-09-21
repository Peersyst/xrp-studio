import useWallet from "module/wallet/component/hooks/useWallet";
import WalletNotConnected from "../WalletNotConnected/WalletNotConnected";

const Wallet = (): JSX.Element => {
    const { isLogged } = useWallet();
    return isLogged ? <></> : <WalletNotConnected />;
};

export default Wallet;
