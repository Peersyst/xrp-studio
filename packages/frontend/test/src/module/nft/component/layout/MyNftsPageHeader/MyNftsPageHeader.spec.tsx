import MyNftsPageHeader from "module/nft/component/layout/MyNftsPageHeader/MyNftsPageHeader";
import { act, render, translate, waitFor } from "test-utils";
import * as ReactRouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import { NftRoutes } from "module/nft/NftRouter";
import { UseFilterMock } from "test-mocks";

describe("Test for the MyNftsPageHeader test", () => {
    test("Renders correctly", () => {
        const screen = render(<MyNftsPageHeader />);
        expect(screen.getByRole("heading", { name: translate("myNfts") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("createCollection") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("createNft") })).toBeInTheDocument();
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
    });
    test("Navigates to the create collection page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);

        const screen = render(<MyNftsPageHeader />);
        const button = screen.getByRole("button", { name: translate("createCollection") });
        userEvent.click(button);

        expect(mockedNavigate).toHaveBeenCalledWith(CollectionRoutes.CREATE_COLLECTION);
    });
    test("Navigates to the create nft page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const screen = render(<MyNftsPageHeader />);
        const button = screen.getByRole("button", { name: translate("createNft") });
        userEvent.click(button);
        expect(mockedNavigate).toHaveBeenCalledWith(NftRoutes.NFT_CREATION);
    });

    test("Update the query filter correctly", async () => {
        const { setFilter } = new UseFilterMock();
        const screen = render(<MyNftsPageHeader />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        userEvent.type(input, "test");
        await act(async () => {
            await waitFor(() => expect(setFilter).toHaveBeenCalledWith("test"));
        });
    });
});
