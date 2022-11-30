import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionPublishModal from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal";
import { CreateCollectionRequest } from "module/api/service";
import { ToastMock, UseCheckBalanceMock } from "test-mocks";

describe("CollectionPublishModal", () => {
    const createCollectionRequest: CreateCollectionRequest = {
        name: "collection-name",
        nfts: [{ metadata: { name: "NFT #1", image: "image1" } }, { metadata: { name: "NFT #2", image: "image2" } }],
    };

    const useToastMock = new ToastMock();

    afterEach(() => {
        useToastMock.clear();
    });

    test("Renders correctly", () => {
        new UseCheckBalanceMock(false);

        render(<CollectionPublishModal request={createCollectionRequest} />);

        // Heading
        expect(screen.getByRole("heading", { name: translate("publishCollectionConfirmation") })).toBeInTheDocument();

        // Collection cover
        expect(screen.getByAltText("collection-header")).toBeInTheDocument();
        expect(screen.getByAltText("collection-image")).toBeInTheDocument();

        // Collection info
        expect(screen.getByText(createCollectionRequest.name!)).toBeInTheDocument();

        // Nfts
        expect(screen.getByText(createCollectionRequest.nfts![0].metadata!.name!)).toBeInTheDocument();

        // Actions
        expect(screen.getByRole("button", { name: translate("back") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("publish") })).toBeInTheDocument();
    });
});
