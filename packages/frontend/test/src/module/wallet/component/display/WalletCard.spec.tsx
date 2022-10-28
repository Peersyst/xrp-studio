import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import * as useGetXrpBalance from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import * as useGetXrpTokenPrice from "module/wallet/component/hooks/useGetXrpTokenPrice/useGetXrpTokenPrice";
import WalletCard from "module/wallet/component/display/WalletCard/WalletCard";
import { WalletMock } from "test-mocks";

describe("WalletCard", () => {
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
