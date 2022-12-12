import { screen } from "@testing-library/react";
import { CollectionService, NftService } from "module/api/service";
import { CollectionDtoMock, PaginatedNftsMock, CreateDropRequestMock, NftDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import DropLaunchModal from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal";
import { waitFor } from "@testing-library/dom";

describe("DropLaunchModal", () => {
    const dropRequestMock = new CreateDropRequestMock();

    const collectionDtoMock = new CollectionDtoMock();
    const paginatedNftsMock = new PaginatedNftsMock({ nftsParams: { length: 1 } }).pages[0];

    let getCollectionMock: jest.SpyInstance;
    let getNftsMock: jest.SpyInstance;

    beforeAll(() => {
        getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionDtoMock);
        getNftsMock = jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftsMock);
    });

    afterAll(() => {
        getCollectionMock.mockRestore();
        getNftsMock.mockRestore();
    });

    test("Renders correctly", async () => {
        render(<DropLaunchModal request={dropRequestMock} collection={new CollectionDtoMock({ nfts: [new NftDtoMock()] })} />);

        // Title
        expect(screen.getByRole("heading", { name: translate("launchDropConfirmation") })).toBeInTheDocument();
        // Drop Information
        // Wait for collection request
        await waitFor(() => expect(screen.getByText(dropRequestMock.price)).toBeInTheDocument());
        // Nfts
        // Wait for NFTs request
        await waitFor(() => expect(screen.getByText(paginatedNftsMock.items[0].metadata!.name!)).toBeInTheDocument());
        // Actions
        expect(screen.getByRole("button", { name: translate("back") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("next") })).toBeInTheDocument();
    });
});
