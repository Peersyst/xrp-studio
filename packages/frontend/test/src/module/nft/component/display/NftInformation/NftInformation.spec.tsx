import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { render, translate } from "test-utils";
import { CollectionDtoMock, CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";
import { screen } from "@testing-library/react";

describe("NftInformation tests", () => {
    const COLLECTIONS_NFT = [new CollectionDtoMock()];

    test("Renders correctly without data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: undefined,
            transferFee: undefined,
            flags: undefined,
            taxon: undefined,
            metadata: new CreateNftMetadataRequestMock({}),
        });
        render(<NftInformation data={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);

        expect(screen.getByRole("heading", { name: translate("noDataProvided") })).toBeInTheDocument();
    });
});
