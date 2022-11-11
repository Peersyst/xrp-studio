import { screen } from "@testing-library/react";
import { UserDtoMock, WalletMock, XRP_ADDRESS_MOCK } from "test-mocks";
import { render, translate } from "test-utils";
import Wallet from "module/wallet/component/core/Wallet/Wallet";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/hook//useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/hook//useGetXrpTokenPrice/useGetXrpTokenPrice";

describe("Wallet", () => {
    beforeEach(() => {
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);
    });

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
