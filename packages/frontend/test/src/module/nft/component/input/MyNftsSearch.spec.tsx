import MyNftsSearch from "module/nft/component/input/MyNftsSearch/MyNftsSearch";
import { render, translate, waitFor } from "test-utils";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import userEvent from "@testing-library/user-event";
import { WalletMock } from "test-mocks";
describe("MyNftsSearch ", () => {
    test("Renders correctly", () => {
        const screen = render(<MyNftsSearch />);
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
    });
    test("Calls the update query fn correctly", async () => {
        const wallet = new WalletMock({ address: "0x123" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const screen = render(<MyNftsSearch />);
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        userEvent.type(input, "test");
        expect(input).toHaveValue("test");
        await waitFor(() => {
            expect(screen.getByTestId("LoaderIcon")).toBeInTheDocument();
        });
        //TODO: add test for the query
    });
});
