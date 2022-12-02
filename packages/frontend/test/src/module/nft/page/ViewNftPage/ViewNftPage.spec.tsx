import { screen } from "@testing-library/react";
import { UseSearchParamsMock } from "test-mocks";
import { NftService } from "module/api/service";
import { CollectionDtoMock, MetadataAttributeDtoMock, MetadataDtoMock, NftDtoMock, PaginatedNftsMock } from "test-mocks";
import { render, translate } from "test-utils";
import ViewNftPage from "module/nft/page/ViewNftPage/ViewNftPage";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";

describe("ViewNftPage", () => {
    let useSearchParamsMock: UseSearchParamsMock;
    let getNftMock: jest.SpyInstance;

    beforeAll(() => {
        useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
    });

    afterAll(() => {
        useSearchParamsMock.restore();
    });

    describe("NFT with only required values", () => {
        const nftMockWithRequiredValues = new NftDtoMock({
            metadata: new MetadataDtoMock({ name: "", description: "", image: "", backgroundColor: "", externalUrl: "", attributes: [] }),
        });

        beforeAll(() => {
            getNftMock = jest.spyOn(NftService, "nftControllerGetNft").mockResolvedValue(nftMockWithRequiredValues);
        });

        afterAll(() => {
            getNftMock.mockRestore();
        });

        test("Renders correctly", async () => {
            render(<ViewNftPage />);

            // Name
            expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
            // Description
            expect(screen.getByText(translate("description"))).toBeInTheDocument();
            // Creator
            expect(screen.getByText(translate("creator"))).toBeInTheDocument();
            // Await get nft call
            await waitFor(() => expect(screen.getByText(nftMockWithRequiredValues.user!.name!)).toBeInTheDocument());
            // TokenID
            expect(screen.getByText(translate("tokenId"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithRequiredValues.tokenId)).toBeInTheDocument();
            // Mint transaction hash
            expect(screen.getByText(translate("mintTransactionHash"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithRequiredValues.mintTransactionHash)).toBeInTheDocument();
            // Collection
            expect(screen.getByText(translate("collection"))).toBeInTheDocument();
            // Transfer fee
            expect(screen.getByText(translate("transferFee"))).toBeInTheDocument();
            // Attributes
            expect(screen.getByText(translate("attributes"))).toBeInTheDocument();

            // Name, description, collection, transfer fee and attribute values
            expect(screen.getAllByText(translate("none"))).toHaveLength(5);
        });
    });

    describe("NFT with all values", () => {
        const collectionMock = new CollectionDtoMock();
        const metadataMock = new MetadataDtoMock({
            name: "name",
            description: "description",
            image: "image",
            backgroundColor: "#FFFFFF",
            externalUrl: "url",
            attributes: [
                new MetadataAttributeDtoMock({ traitType: "attr1", value: "val1" }),
                new MetadataAttributeDtoMock({ traitType: "attr2", value: "val2" }),
            ],
        });
        const nftMockWithAllValues = new NftDtoMock({
            issuer: "issuer",
            transferFee: 45,
            collection: collectionMock,
            metadata: metadataMock,
        });

        let getNftCollectionMock: jest.SpyInstance;

        beforeAll(() => {
            getNftMock = jest.spyOn(NftService, "nftControllerGetNft").mockResolvedValue(nftMockWithAllValues);
            getNftCollectionMock = jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(new PaginatedNftsMock().pages[0]);
        });

        afterAll(() => {
            getNftMock.mockRestore();
            getNftCollectionMock.mockRestore();
        });

        test("Renders correctly", async () => {
            render(<ViewNftPage />);

            // Name
            expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
            // Await get nft call
            await waitFor(() => expect(screen.getByText(metadataMock.name!)).toBeInTheDocument());
            // Description
            expect(screen.getByText(translate("description"))).toBeInTheDocument();
            expect(screen.getByText(metadataMock.description!)).toBeInTheDocument();
            // Creator
            expect(screen.getByText(translate("creator"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithAllValues.user!.name!)).toBeInTheDocument();
            // TokenID
            expect(screen.getByText(translate("tokenId"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithAllValues.tokenId)).toBeInTheDocument();
            // Mint transaction hash
            expect(screen.getByText(translate("mintTransactionHash"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithAllValues.mintTransactionHash)).toBeInTheDocument();
            // Collection
            expect(screen.getByText(translate("collection"))).toBeInTheDocument();
            expect(screen.getByText(collectionMock.name!)).toBeInTheDocument();
            // Issuer
            expect(screen.getByText(translate("issuer"))).toBeInTheDocument();
            expect(screen.getByText(nftMockWithAllValues.issuer!)).toBeInTheDocument();
            // Transfer fee
            expect(screen.getByText(translate("transferFee"))).toBeInTheDocument();
            expect(
                screen.getByText(
                    translate("formatNumber", {
                        val: nftMockWithAllValues.transferFee,
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3!,
                    }) + "%",
                ),
            ).toBeInTheDocument();
            // External url
            expect(screen.getByText(translate("externalLink"))).toBeInTheDocument();
            expect(screen.getByText(metadataMock.externalUrl!)).toBeInTheDocument();
            // Background color
            expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
            expect(screen.getByText(metadataMock.backgroundColor!)).toBeInTheDocument();
            // Attributes
            expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
            expect(screen.getByDisplayValue(metadataMock.attributes![0].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(metadataMock.attributes![0].value)).toBeInTheDocument();
            expect(screen.getByDisplayValue(metadataMock.attributes![1].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(metadataMock.attributes![1].value)).toBeInTheDocument();
            // Collections carousel
            await waitFor(() => expect(screen.getByText(translate("showCollection"))).toBeInTheDocument());
        });
    });
});
