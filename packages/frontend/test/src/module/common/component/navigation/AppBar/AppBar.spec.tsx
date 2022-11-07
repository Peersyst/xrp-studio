import AppBar from "module/common/component/navigation/AppBar/AppBar";
import { WalletMock } from "test-mocks";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/dom";

describe("AppBar test", () => {
    test("Renders correctly without login", async () => {
        const wallet = new WalletMock({ address: "0x", isLogged: false });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const screen = render(<AppBar />);

        await waitFor(() => expect(screen.getByText(translate("letsGetStarted"))).toBeInTheDocument());
        await waitFor(() => expect(() => screen.getByText(translate("dashboard"))).toThrow());
        await waitFor(() => expect(() => screen.getByText(translate("myNfts"))).toThrow());
        await waitFor(() => expect(() => screen.getByText(translate("myDrops"))).toThrow());
        await waitFor(() => expect(screen.getByTestId("MoonIcon")).toBeInTheDocument());
    });
});
