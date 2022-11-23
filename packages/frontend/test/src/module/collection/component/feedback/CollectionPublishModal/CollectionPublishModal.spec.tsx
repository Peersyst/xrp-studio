import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionPublishModal from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal";
import { CollectionService, CreateCollectionRequest } from "module/api/service";
import { CollectionDtoMock, ToastMock, UseCheckBalanceMock } from "test-mocks";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

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

    test("Tries to publish without balance", async () => {
        new UseCheckBalanceMock(false);

        render(<CollectionPublishModal request={createCollectionRequest} />);

        userEvent.click(screen.getByRole("button", { name: translate("publish") }));
        await waitFor(() =>
            expect(useToastMock.showToast).toHaveBeenCalledWith(translate("notEnoughBalance", { ns: "error" }), { type: "error" }),
        );
    });

    test("Tries to publish with balance", async () => {
        new UseCheckBalanceMock(true);
        const createCollectionMock = jest
            .spyOn(CollectionService, "collectionControllerCreateCollection")
            .mockResolvedValue(new CollectionDtoMock());

        render(<CollectionPublishModal request={createCollectionRequest} />);

        userEvent.click(screen.getByRole("button", { name: translate("publish") }));
        await act(() => waitFor(() => expect(createCollectionMock).toHaveBeenCalledWith(createCollectionRequest, true)));
    });
});
