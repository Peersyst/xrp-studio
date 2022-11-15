import { render } from "test-utils";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import { screen } from "@testing-library/react";

describe("NftCover tests", () => {
    const NFT_IMAGE_LINK = "image";

    test("Renders correctly with link", () => {
        render(<NftCoverImage src={NFT_IMAGE_LINK} alt="nft-image" />);

        expect(screen.getByRole("img")).toHaveAttribute("src", NFT_IMAGE_LINK);
    });
});
