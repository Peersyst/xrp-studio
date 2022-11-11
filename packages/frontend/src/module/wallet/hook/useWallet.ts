import { Wallet } from "module/wallet/types";
import { useRecoilValue } from "recoil";
import { walletState } from "module/wallet/state/WalletState";

export default function (): Wallet {
    return useRecoilValue(walletState);
}
