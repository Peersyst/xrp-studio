import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { render, translate } from "test-utils";
import { CollectionDtoMock, CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";
import { screen } from "@testing-library/react";

describe("NftInformation tests", () => {
    const COLLECTIONS_NFT = [new CollectionDtoMock()];
    test("Renders correctly with data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: "issuer",
            transferFee: 3,
            flags: { burnable: true, onlyXRP: true, trustLine: true, transferable: true },
            taxon: 1,
            metadata: new CreateNftMetadataRequestMock({ name: "nft_name" }),
        });
        render(<NftInformation data={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);

        expect(screen.queryByText("nft_name")).toBeInTheDocument();
        expect(screen.queryByText("issuer")).toBeInTheDocument();
        expect(screen.queryByText("collection_name")).toBeInTheDocument();
        expect(screen.queryByText("3%")).toBeInTheDocument();
        expect(screen.queryByText(translate("burnable"))).toBeInTheDocument();
        expect(screen.queryByText(translate("onlyXRP"))).toBeInTheDocument();
        expect(screen.queryByText(translate("trustLine"))).toBeInTheDocument();
        expect(screen.queryByText(translate("transferable"))).toBeInTheDocument();
    });

    test("Renders correctly without data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: undefined,
            transferFee: undefined,
            flags: undefined,
            taxon: undefined,
            metadata: new CreateNftMetadataRequestMock({}),
        });
        render(<NftInformation data={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);

        expect(screen.getByRole("heading", { name: "No data provided" })).toBeInTheDocument();
    });
});
