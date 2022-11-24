import { screen } from "@testing-library/react";
import { render } from "test-utils";
import NftCardCarousel from "module/nft/component/display/NftCardCarousel/NftCardCarousel";
import { MetadataDtoMock, NftDtoMock } from "test-mocks";

describe("NftCardCarousel", () => {
    test("Renders correctly", () => {
        const nftMocks = [...Array(3)].map((_, i) => new NftDtoMock({ id: i + 1, metadata: new MetadataDtoMock({ name: "NFT #" + i }) }));

        render(<NftCardCarousel nfts={nftMocks} />);

        for (const nftMock of nftMocks) expect(screen.getByText(nftMock.metadata!.name!));
    });
});
