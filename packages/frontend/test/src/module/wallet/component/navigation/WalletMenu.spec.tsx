import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { WalletMock } from "../../../../../__mocks__/wallet";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import WalletMenu from "module/wallet/component/navigation/WalletMenu/WalletMenu";

describe("WalletMenu", () => {
    test("Renders Menu", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);

        render(<WalletMenu />);
        expect(screen.getByText(translate("profile"))).toBeInTheDocument();
        expect(screen.getByText(translate("settings"))).toBeInTheDocument();
        expect(screen.getByText(translate("logout"))).toBeInTheDocument();
    });
});
