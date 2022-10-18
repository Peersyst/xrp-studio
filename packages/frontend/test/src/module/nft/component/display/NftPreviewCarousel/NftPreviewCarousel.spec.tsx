import { screen } from "@testing-library/react";
import { NftsDtoMock } from "test-mocks";
import { render } from "test-utils";
import NftPreviewCarousel from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel";
import { NftDto } from "module/api/service";

const NFT_PREVIEWS_LENGTH = 5;

describe("NftPreviewCarousel", () => {
    const nftMocks = new NftsDtoMock({ length: NFT_PREVIEWS_LENGTH }).nfts;

    const to = (nft: NftDto): string => {
        return `/nft/creation?id=${nft.id}`;
    };

    test("Renders correctly without links", () => {
        render(<NftPreviewCarousel nfts={nftMocks} />);

        expect(screen.queryByRole("link")).toBeNull();
        expect(screen.getAllByText(nftMocks[0].metadata!.name!)).toHaveLength(NFT_PREVIEWS_LENGTH);
    });

    test("Renders correctly with links", () => {
        render(<NftPreviewCarousel nfts={nftMocks} to={to} />);

        expect(screen.getAllByRole("link")).toHaveLength(NFT_PREVIEWS_LENGTH);
    });
});
