import { screen } from "@testing-library/react";
import { MetadataDtoMock, NftDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import DropLandingNftsSection from "module/drop/component/display/DropLanding/DropLandingNftsSection/DropLandingNftsSection";

describe("DropLandingNftsSection", () => {
    test("Renders correctly", () => {
        const nftMocks = [...Array(3)].map((_, i) => new NftDtoMock({ metadata: new MetadataDtoMock({ name: "NFT #" + i }) }));

        render(<DropLandingNftsSection nfts={nftMocks} />);

        expect(screen.getByRole("heading", { name: translate("theNfts") }));
        for (const nftMock of nftMocks) expect(screen.getByText(nftMock.metadata!.name!));
    });
});
