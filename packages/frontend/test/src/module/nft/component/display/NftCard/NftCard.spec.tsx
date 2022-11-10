import { screen } from "@testing-library/react";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { render } from "test-utils";
import { NftDtoMock } from "test-mocks";
import { NftRoutes } from "module/nft/NftRouter";

describe("NftCard", () => {
    const nftMock = new NftDtoMock();

    test("Renders correctly with note", () => {
        render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
    });

    test("Renders correctly status different than confirmed", () => {
        nftMock.status = "draft";
        const screen = render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
        expect(screen.getByText("draft")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", `${NftRoutes.NFT_CREATION}?id=${nftMock.id}`);
    });

    test("Renders correctly status confirmed", () => {
        nftMock.status = "confirmed";
        const screen = render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
        expect(screen.queryByText("confirmed")).not.toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", NftRoutes.VIEW_NFT.replace(":id", nftMock.id.toString()));
    });
});
