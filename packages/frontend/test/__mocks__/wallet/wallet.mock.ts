import { Wallet } from "module/wallet/types";
import * as useWallet from "module/wallet/component/hooks/useWallet";

export const XRP_ADDRESS_MOCK = "rPmPErQe4g9725pcNxJpuvKkdqTESTQ6Tu";
export const XRP_ADDRESS_MOCK_SCRIBBLED = "rPm...u";

export class WalletMock {
    isLogged: boolean;
    address: string | undefined;
    active: boolean;

    constructor({ isLogged = false, address = undefined, active = false }: Partial<Wallet> = {}) {
        this.isLogged = isLogged;
        this.address = address;
        this.active = active;
        jest.spyOn(useWallet, "default").mockReturnValue(this);
    }
}
