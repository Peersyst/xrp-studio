import { CollectionService, NftService } from "module/api/service";
import CollectionHeader from "module/collection/component/layout/CollectionHeader/CollectionHeader";
import { CollectionDtoMock, NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";

describe("Test for the Collection Header", () => {
    describe("Collection Heade render", () => {
        test("Renders Information of Collection", async () => {
            const collectionMock = new CollectionDtoMock();
            jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionMock);
            const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
            jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
            const screen = render(<CollectionHeader />);

            await waitFor(() => expect(screen.getByText(collectionMock.name!)).toBeInTheDocument());

            const images = screen.getAllByRole("img");
            expect(images.some((image) => image.getAttribute("alt") === "collection-image")).toBe(true);
            expect(images.some((image) => image.getAttribute("alt") === "collection-header")).toBe(true);
            expect(screen.getByText(translate("itemWithCount", { count: collectionMock.items })));
        });
    });
});
