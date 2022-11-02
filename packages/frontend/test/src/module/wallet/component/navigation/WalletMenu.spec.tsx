import { fireEvent, render, translate } from "test-utils";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import WalletMenu from "module/wallet/component/navigation/WalletMenu/WalletMenu";
import { UserDtoMock, WalletMock } from "test-mocks";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/component/hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import * as Recoil from "recoil";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import * as ReactRouter from "react-router-dom";
import { UserRoutes } from "module/user/UserRouter";

describe("WalletMenu", () => {
    const wallet = new WalletMock({ address: "0x123" });
    beforeEach(() => {
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);

        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });
    test("Renders Menu", async () => {
        const screen = render(<WalletMenu setVisible={jest.fn()} />);
        expect(screen.getByRole("button", { name: translate("profile") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("settings") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("logout") })).toBeInTheDocument();
        //WalletCard
        expect(screen.getByText(translate("0x123"))).toBeInTheDocument();
    });

    test("Logs out", async () => {
        const mockedResetRecoil = jest.fn();
        const mockedClear = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(mockedResetRecoil);
        jest.spyOn(AuthTokenStorage, "clear").mockImplementation(mockedClear);
        const screen = render(<WalletMenu setVisible={jest.fn()} />);
        const logoutBtn = screen.getByRole("button", { name: translate("logout") });
        fireEvent.click(logoutBtn);
        expect(mockedResetRecoil).toHaveBeenCalled();
        expect(mockedClear).toHaveBeenCalled();
    });

    test("Navigates to profile", async () => {
        const mocketSetVisible = jest.fn();
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(mockedNavigate);

        const screen = render(<WalletMenu setVisible={mocketSetVisible} />);
        const profileBtn = screen.getByRole("button", { name: translate("profile") });
        expect(profileBtn).toBeInTheDocument();
        fireEvent.click(profileBtn);
        expect(mocketSetVisible).toHaveBeenCalled();
        expect(mockedNavigate).toHaveBeenCalledWith(UserRoutes.PROFILE.replace(":address", wallet.address!));
    });
    test("Navigates to settings", async () => {
        const mocketSetVisible = jest.fn();
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(mockedNavigate);
        const screen = render(<WalletMenu setVisible={mocketSetVisible} />);
        const settingsBtn = screen.getByRole("button", { name: translate("settings") });
        expect(settingsBtn).toBeInTheDocument();
        fireEvent.click(settingsBtn);
        expect(mockedNavigate).toHaveBeenCalledWith(UserRoutes.SETTINGS);
    });
});
