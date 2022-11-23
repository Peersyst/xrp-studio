import { fireEvent, render, translate } from "test-utils";
import * as UseWallet from "module/wallet/hook//useWallet";
import WalletMenu from "module/wallet/component/navigation/WalletMenu/WalletMenu";
import { UserDtoMock, WalletMock } from "test-mocks";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/hook//useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/hook//useGetXrpTokenPrice/useGetXrpTokenPrice";
import * as Recoil from "recoil";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

describe("WalletMenu", () => {
    const wallet = new WalletMock({ address: "0x123" });
    beforeEach(() => {
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });
    test("Renders Menu", async () => {
        const screen = render(<WalletMenu />);

        expect(screen.getByRole("link", { name: translate("profile") })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: translate("settings") })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: translate("logout") })).toBeInTheDocument();

        expect(screen.getByText(translate("0x123"))).toBeInTheDocument();
    });

    test("Logs out", async () => {
        const mockedResetRecoil = jest.fn();
        const mockedClear = jest.fn();

        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(mockedResetRecoil);
        jest.spyOn(AuthTokenStorage, "clear").mockImplementation(mockedClear);

        const screen = render(<WalletMenu />);

        // onClick is fired when clicking the Typography inside Link
        const logoutBtn = screen.getByRole("link", { name: translate("logout") }).children[0];
        fireEvent.click(logoutBtn);
        expect(mockedClear).toHaveBeenCalled();
        expect(mockedResetRecoil).toHaveBeenCalled();
    });
});
