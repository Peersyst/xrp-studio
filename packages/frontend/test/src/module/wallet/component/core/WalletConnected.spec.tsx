import { screen } from "@testing-library/react";
import WalletConnected from "module/wallet/component/core/WalletConnected/WalletConnected";
import { render, translate } from "test-utils";
import { WalletMock } from "../../../../../__mocks__/wallet";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import * as useGetUser from "module/user/query/useGetUser";
import * as useGetXrpBalance from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/component/hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import { UserDtoMock } from "../../../../../__mocks__/dto";
import WalletCard from "module/wallet/component/display/WalletCard/WalletCard";

describe("WalletConnected test", () => {
    test("Renders correctly", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);

        render(<WalletConnected />);
        expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "avatar");
        expect(screen.getAllByText("0x123").length).toBeLessThanOrEqual(2);
    });

    test("Renders Menu", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(useGetUser, "default").mockReturnValue({ data: UserDtoMock } as any);

        render(<WalletConnected />);
        expect(screen.getByText(translate("profile"))).toBeInTheDocument();
        expect(screen.getByText(translate("settings"))).toBeInTheDocument();
        expect(screen.getByText(translate("logout"))).toBeInTheDocument();
    });

    test("Renders WalletCard", () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(useGetXrpBalance, "useGetXrpBalance").mockReturnValue({ data: 15 } as any);
        jest.spyOn(useGetXrpTokenPrice, "useGetXrpTokenPrice").mockReturnValue({ data: 2 } as any);

        render(<WalletCard />);
        expect(screen.getByText(translate("0x123"))).toBeInTheDocument();
        expect(screen.getByText(translate(15))).toBeInTheDocument();
    });
});
