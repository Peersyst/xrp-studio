import { screen } from "@testing-library/react";
import { UseSearchParamsMock, UseNavigateMock, CollectionDtoMock, PaginatedNftsMock } from "test-mocks";
import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/dom";
import DropCreationPage from "module/drop/page/DropCreationPage/DropCreationPage";
import { CollectionService, NftService } from "module/api/service";

describe("DropCreationPage", () => {
    const useNavigateMock = new UseNavigateMock();

    beforeEach(() => {
        useNavigateMock.clear();
    });

    describe("Creation Drop", () => {
        let useSearchParamsMock: UseSearchParamsMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
        });

        afterAll(() => {
            useSearchParamsMock.restore();
        });

        test("Renders correctly", async () => {
            const collectionDtoMock = new CollectionDtoMock();
            const paginatedNftsMock = new PaginatedNftsMock().pages[0];

            jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionDtoMock);
            jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftsMock);

            render(<DropCreationPage />);

            // Header
            expect(screen.getByText(translate("customizeDropPage")));

            // Price
            expect(screen.getByPlaceholderText(translate("price"))).toBeInTheDocument();

            // Preview
            await waitFor(() => expect(screen.getByRole("heading", { name: collectionDtoMock.name })).toBeInTheDocument());
        });
    });
});
