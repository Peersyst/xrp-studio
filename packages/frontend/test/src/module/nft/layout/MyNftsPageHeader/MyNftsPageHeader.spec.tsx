import MyNftsPageHeader from "module/nft/component/layout/MyNftsPageHeader/MyNftsPageHeader";
import { fireEvent, render, translate } from "test-utils";
import * as ReactRouterDom from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";

describe("MyNftsPageHeader", () => {
    test("Should render", () => {
        const { getByRole } = render(<MyNftsPageHeader />);
        expect(getByRole("button", { name: translate("createCollection") })).toBeInTheDocument();
        expect(getByRole("button", { name: translate("createNft") })).toBeInTheDocument();
    });

    test("Should navigate to create nft", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const { getByRole } = render(<MyNftsPageHeader />);
        const btn = getByRole("button", { name: translate("createNft") });
        fireEvent.click(btn);
        expect(mockedNavigate).toHaveBeenCalledWith(NftRoutes.CREAT_NFT);
    });

    test("Should navigate to create collection", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const { getByRole } = render(<MyNftsPageHeader />);
        const btn = getByRole("button", { name: translate("createCollection") });
        fireEvent.click(btn);
        expect(mockedNavigate).toHaveBeenCalledWith(NftRoutes.CREATE_COLLECTION);
    });
});
