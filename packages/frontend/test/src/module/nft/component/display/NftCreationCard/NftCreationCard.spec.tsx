import { screen } from "@testing-library/react";
import { render } from "test-utils";
import NftCreationCard from "module/nft/component/display/NftCreationCard/NftCreationCard";
import { CreateNftDraftRequestMock } from "test-mocks";

describe("NftCreationCard", () => {
    const createNftMock = new CreateNftDraftRequestMock();

    test("Renders correctly", () => {
        render(<NftCreationCard nft={createNftMock} />);
        expect(screen.getByText(createNftMock.metadata!.name!)).toBeInTheDocument();
    });
});
