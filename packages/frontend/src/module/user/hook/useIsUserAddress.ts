import useWallet from "module/wallet/hook/useWallet";
import { useGetUserAddress } from "./useGetUserAddress";

export default function useIsUserAddress(): boolean {
    const wallet = useWallet();
    const address = useGetUserAddress();

    return wallet.address === address;
}
