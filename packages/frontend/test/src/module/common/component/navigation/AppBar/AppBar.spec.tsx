import AppBar from "module/common/component/navigation/AppBar/AppBar";
import { WalletMock } from "test-mocks";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { render, translate } from "test-utils";

describe("AppBar test", () => {
    test("Renders correctly without login", () => {
        const wallet = new WalletMock({ address: "0x", isLogged: false });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const screen = render(<AppBar />);

        expect(screen.getByText(translate("letsGetStarted"))).toBeInTheDocument();
        expect(() => screen.getByText(translate("dashboard"))).toThrow();
        expect(() => screen.getByText(translate("myNfts"))).toThrow();
        expect(() => screen.getByText(translate("myDrops"))).toThrow();
        expect(screen.getByTestId("MoonIcon")).toBeInTheDocument();
    });
    test("Renders correctly with login", () => {
        const wallet = new WalletMock({ address: "0x1", isLogged: true });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const screen = render(<AppBar />);

        expect(() => screen.getByText(translate("letsGetStarted"))).toThrow();
        expect(screen.getByText(translate("dashboard"))).toBeInTheDocument();
        expect(screen.getByText(translate("myNfts"))).toBeInTheDocument();
        expect(screen.getByText(translate("myDrops"))).toBeInTheDocument();
        expect(screen.getByTestId("MoonIcon")).toBeInTheDocument();
    });
});
