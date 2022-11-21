import { screen } from "@testing-library/react";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { render, translate } from "test-utils";
import { DropDtoMock, MetadataDtoMock, NftDtoMock } from "test-mocks";

describe("DropLanding", () => {
    const nftMocks = [...Array(3)].map((_, i) => new NftDtoMock({ metadata: new MetadataDtoMock({ name: "NFT #" + i }) }));

    test("Renders correctly with all properties", () => {
        const dropDtoMock = new DropDtoMock();
        dropDtoMock.twitter = "http://twitter.com";

        render(<DropLanding drop={dropDtoMock} nfts={nftMocks} />);

        // Description section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.name })).toBeInTheDocument();
        // Video section
        expect(screen.getByTestId("Player")).toHaveAttribute("data-url", dropDtoMock.videoUrl);
        // Artist section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.user.name })).toBeInTheDocument();
        // NFTs section
        expect(screen.getByText(nftMocks[0].metadata!.name!));
        // Social Media Section
        expect(screen.getByText(translate("jounOurCommunity")));
        // Social Network Twitter Show
        expect(screen.getByTestId("TwitterIcon")).toBeInTheDocument();
        // Social Network not show Intagram
        expect(screen.queryByTestId("IntagramIcon")).not.toBeInTheDocument();
    });

    test("Renders correctly without optional properties", () => {
        const dropDtoMock = new DropDtoMock({ videoUrl: null as any });

        render(<DropLanding drop={dropDtoMock} nfts={nftMocks} />);

        // Description section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.name })).toBeInTheDocument();
        // Video section
        expect(screen.queryByTestId("Player")).toBeNull();
        // Artist section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.user.name })).toBeInTheDocument();
        // NFTs section
        expect(screen.getByText(nftMocks[0].metadata!.name!));
        // Social Media Section
        expect(screen.getByText(translate("jounOurCommunity")));
    });
});
