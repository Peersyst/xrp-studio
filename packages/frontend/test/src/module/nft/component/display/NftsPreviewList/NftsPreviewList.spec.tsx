import { screen } from "@testing-library/react";
import { render } from "test-utils";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import { PreviewNft } from "module/nft/types";

describe("NftsPreviewList", () => {
    test("Renders correctly", () => {
        const nfts: PreviewNft[] = [{ metadata: { name: "NFT 1", image: "image1" } }, { metadata: { image: "image2" } }];

        render(<NftsPreviewList nfts={nfts} />);

        expect(screen.getByAltText(nfts[0].metadata.name + "-image")).toBeInTheDocument();
        expect(screen.getByText(nfts[0].metadata.name)).toBeInTheDocument();
        expect(screen.getByAltText("nft-image")).toBeInTheDocument();
    });
});
