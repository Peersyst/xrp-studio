import { render } from "test-utils";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("NftCover tests", () => {
    const NFT_IMAGE_LINK = "image";

    test("Renders correctly with link", async () => {
        render(<NftCoverImage src={NFT_IMAGE_LINK} alt="nft-image" />);

        await waitFor(() => expect(screen.getByRole("img")).toHaveAttribute("src", NFT_IMAGE_LINK));
    });
});
