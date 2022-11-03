import { CollectionService, NftService } from "module/api/service";
import CollectionPage from "module/collection/page/CollectionPage";
import { CollectionDtoMock, NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, waitFor } from "test-utils";

describe("Test for the CollectionPage", () => {
    describe("Collection render", () => {
        test("Renders correctly with nfts", async () => {
            const collectionMock = new CollectionDtoMock();
            jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionMock);
            const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
            jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
            const screen = render(<CollectionPage />);
            //Grid
            await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
        });
    });
});
