import { screen } from "@testing-library/react";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { render } from "test-utils";
import NftMock from "../../../../../__mocks__/Nft.mock";

describe("NftCard", () => {
    const nftMock = new NftMock();

    test("Renders correctly with note", () => {
        render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata.name)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("alt", nftMock.metadata.name);
    });
});
