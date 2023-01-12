import { screen } from "@testing-library/react";
import { CollectionService, CreateCollectionRequest } from "module/api/service";
import { CollectionDtoMock, UseCheckBalanceMock, UseCollectionNftsStatusMock } from "test-mocks";
import { render, translate, act } from "test-utils";
import { waitFor } from "@testing-library/dom";
import CollectionPublishActions from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishActions/CollectionPublishActions";

describe("CollectionPublishActions", function () {
    const collectionDtoMock = new CollectionDtoMock({ nfts: [] });
    const createCollectionRequest: CreateCollectionRequest = {
        name: "collection-name",
        nfts: [{ metadata: { name: "NFT #1", image: "image1" } }, { metadata: { name: "NFT #2", image: "image2" } }],
    };

    let useCheckBalanceMock: UseCheckBalanceMock;
    let createCollectionMock: jest.SpyInstance;
    let getCollectionNftsStatusMock: UseCollectionNftsStatusMock;

    beforeEach(() => {
        useCheckBalanceMock = new UseCheckBalanceMock();
        createCollectionMock = jest.spyOn(CollectionService, "collectionControllerCreateCollection").mockResolvedValue(collectionDtoMock);
        getCollectionNftsStatusMock = new UseCollectionNftsStatusMock();
    });

    afterAll(() => {
        useCheckBalanceMock.restore();
        createCollectionMock.mockRestore();
        getCollectionNftsStatusMock.restore();
    });

    test("Renders correctly", async () => {
        render(<CollectionPublishActions request={createCollectionRequest} />);

        expect(screen.getByText(translate("collectionCreationStepTitle")));
        expect(screen.getByText(translate("collectionCreationStepText")));
        expect(screen.getByText(translate("collectionNftsConfirmationStepTitle")));
        expect(screen.getByText(translate("collectionCreationSuccessStepTitle")));
        // Await steps
        await act(() => waitFor(() => expect(screen.getAllByTestId("CheckCircleIcon")).toHaveLength(3)));
    });
});
