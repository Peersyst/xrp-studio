import { screen } from "@testing-library/react";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { render, translate } from "test-utils";
import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";

describe("NftInformation tests", () => {
    const COLLECTION_NFT = "collection-name";

    test("Renders correctly with data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: "0x",
            transferFee: 1,
            flags: undefined,
            taxon: 1,
            metadata: new CreateNftMetadataRequestMock({ name: "nft-name", image: "src-image" }),
        });

        render(<NftInformation request={createNftDraftRequestMock} collection={COLLECTION_NFT} />);

        expect(screen.getByText("nft-name")).toBeInTheDocument();
        expect(screen.getByText(COLLECTION_NFT)).toBeInTheDocument();
        expect(screen.getByText("0x")).toBeInTheDocument();
        expect(screen.getByText("1%")).toBeInTheDocument();
    });
    test("Renders correctly without data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: undefined,
            transferFee: undefined,
            flags: undefined,
            taxon: undefined,
            metadata: new CreateNftMetadataRequestMock({}),
        });

        render(<NftInformation request={createNftDraftRequestMock} />);

        expect(screen.getByRole("heading", { name: translate("noDataProvided") })).toBeInTheDocument();
    });
});
