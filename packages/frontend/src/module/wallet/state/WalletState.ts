import { atom } from "recoil";
import { Wallet } from "../types";

export const initialWalletState: Wallet = {
    isLogged: false,
    address: undefined,
    active: true,
};

export const walletState = atom<Wallet>({
    key: "wallet",
    default: initialWalletState,
});
