import { screen, render, translate } from "test-utils";
import NftCreationPageHeader from "module/nft/component/layout/NftCreationPageHeader/NftCreationPageHeader";
import { UseSearchParamsMock } from "test-mocks";

describe("NftCreationPageHeader", () => {
    test("Renders create NFT correctly", () => {
        render(<NftCreationPageHeader />);

        expect(screen.getByText(translate("createNft")));
    });

    test("Renders edit NFT correctly", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<NftCreationPageHeader />, { router: { path: "/nfts/creation?id=1" } });

        expect(screen.getByText(translate("editNft")));
    });

    test("Renders edit NFT correctly loading", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<NftCreationPageHeader loading />, { router: { path: "/nfts/creation?id=1" } });

        screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());
    });

    test("Renders edit NFT correctly saving", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<NftCreationPageHeader saving />, { router: { path: "/nfts/creation?id=1" } });

        expect(screen.getByRole("button", { name: translate("cancel") })).toBeDisabled();
        expect(screen.getByRole("button", { name: translate("publish") })).toBeDisabled();
    });

    test("Renders edit NFT correctly publishing", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<NftCreationPageHeader publishing />, { router: { path: "/nfts/creation?id=1" } });

        expect(screen.getByRole("button", { name: translate("cancel") })).toBeDisabled();
        expect(screen.getByRole("button", { name: translate("save") })).toBeDisabled();
    });
});
