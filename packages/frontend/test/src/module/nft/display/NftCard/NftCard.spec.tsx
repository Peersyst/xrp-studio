import { screen } from "@testing-library/react";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { render } from "test-utils";
import { NftDtoMock } from "test-mocks";

describe("NftCard", () => {
    const nftMock = new NftDtoMock();

    test("Renders correctly with note", () => {
        render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
    });
});
