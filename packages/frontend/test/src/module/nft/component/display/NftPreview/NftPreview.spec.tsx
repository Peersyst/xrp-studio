import { screen } from "@testing-library/react";
import { render } from "test-utils";
import NftPreview from "module/nft/component/display/NftPreview/NftPreview";
import { NftDtoMock } from "test-mocks";

describe("NftPreview", () => {
    const nftMock = new NftDtoMock();
    const nftName = nftMock.metadata!.name!;
    const nftPreviewLink = `/nft/creation?id=${nftMock.id}`;
    const mockNftDefaultPreviewIUrl = "url";

    test("Renders correctly without link", () => {
        render(<NftPreview nft={nftMock} defaultPreviewUrl={mockNftDefaultPreviewIUrl} />);

        expect(screen.queryByRole("link")).toBeNull();
        expect(screen.getByRole("img")).toHaveAttribute("alt", `${nftName}-preview-img`);
        expect(screen.getByText(nftName)).toBeInTheDocument();
    });

    test("Renders correctly with link", () => {
        render(<NftPreview nft={nftMock} to={nftPreviewLink} defaultPreviewUrl={mockNftDefaultPreviewIUrl} />);

        expect(screen.queryByRole("link")).toHaveAttribute("href", nftPreviewLink);
    });

    test("Renders correctly with link", () => {
        render(<NftPreview nft={nftMock} loading defaultPreviewUrl={mockNftDefaultPreviewIUrl} />);

        expect(screen.getByText("loading name")).toBeInTheDocument();
    });
});
