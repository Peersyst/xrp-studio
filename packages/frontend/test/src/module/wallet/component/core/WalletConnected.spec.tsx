import { screen } from "@testing-library/react";
import WalletConnected from "module/wallet/component/core/WalletConnected/WalletConnected";
import { render } from "test-utils";
import { WalletMock } from "../../../../../__mocks__/wallet";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/component/hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import { UserDtoMock } from "../../../../../__mocks__/dto";

describe("WalletConnected test", () => {
    beforeEach(() => {
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);
    });

    test("Renders correctly", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);

        render(<WalletConnected />);
        expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "avatar");
        expect(screen.getAllByText("0x123").length).toBeLessThanOrEqual(2);
    });
});
