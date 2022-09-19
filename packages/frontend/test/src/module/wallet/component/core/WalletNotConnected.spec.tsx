import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import WalletNotConnected from "module/wallet/component/core/WalletNotConnected/WalletNotConnected";

describe("WalletNotConnected test", () => {
    test("Renders correctly", () => {
        render(<WalletNotConnected />);
        expect(screen.getByText(translate("letsGetStarted"))).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("loginWithXumm") })).toBeInTheDocument();
    });
});
