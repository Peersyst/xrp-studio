import { screen } from "@testing-library/react";
import { render } from "test-utils";
import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";
import NftCreationCard from "module/nft/component/display/NftCreationCard/NftCreationCard";

describe("NftCreationCard", () => {
    const createNftMock = new CreateNftDraftRequestMock({ metadata: new CreateNftMetadataRequestMock({ name: "nft_name" }) });

    test("Renders correctly", () => {
        render(<NftCreationCard nft={createNftMock} />);
        expect(screen.getByText(createNftMock.metadata!.name!)).toBeInTheDocument();
    });
});
