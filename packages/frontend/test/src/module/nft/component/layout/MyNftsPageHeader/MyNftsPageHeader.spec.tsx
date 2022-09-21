import MyNftsPageHeader from "module/nft/component/layout/MyNftsPageHeader/MyNftsPageHeader";
import { render, translate } from "test-utils";
import * as ReactRouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { NftRoutes } from "module/nft/NftRouter";

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
        expect(mockedNavigate).toHaveBeenCalledWith(NftRoutes.CREATE_NFT);
    });
});
