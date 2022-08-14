import { screen } from "@testing-library/react";
import { WalletMock, XRP_ADDRESS_MOCK } from "test-mocks";
import { render, translate } from "test-utils";
import Wallet from "module/wallet/component/core/Wallet/Wallet";

describe("Wallet", () => {
    test("Renders correctly when not connected", () => {
        new WalletMock({ isLogged: false, address: undefined, active: false });
        render(<Wallet />);
        expect(screen.getByText(translate("letsGetStarted"))).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("loginWithXumm") })).toBeInTheDocument();
    });

    test("Renders correctly when connected", () => {
        new WalletMock({ isLogged: true, address: XRP_ADDRESS_MOCK, active: true });
        render(<Wallet />);
        expect(screen.queryByText(translate("letsGetStarted"))).toBeNull();
        expect(screen.queryByRole("button", { name: translate("loginWithXumm") })).toBeNull();
    });
});
