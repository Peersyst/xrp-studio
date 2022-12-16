import WalletConnected from "module/wallet/component/core/WalletConnected/WalletConnected";
import { render, translate } from "test-utils";
import * as UseWallet from "module/wallet/hook//useWallet";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/hook//useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/hook//useGetXrpTokenPrice/useGetXrpTokenPrice";
import { UserDtoMock, WalletMock } from "test-mocks";

describe("WalletConnected test", () => {
    beforeEach(() => {
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);
    });

    test("Renders correctly", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);

        const screen = render(<WalletConnected />);
        expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "avatar");
        expect(screen.getAllByText("0x123").length).toBeLessThanOrEqual(2);
        //Menu
        expect(screen.getByText(translate("profile"))).toBeInTheDocument();
        expect(screen.getByText(translate("logout"))).toBeInTheDocument();
        //WalletCard
        expect(screen.getByText(translate("0x123"))).toBeInTheDocument();
        expect(screen.getByText(translate(15))).toBeInTheDocument();
    });
});
