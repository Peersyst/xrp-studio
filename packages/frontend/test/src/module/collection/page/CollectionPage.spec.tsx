import { CollectionService, NftService } from "module/api/service";
import CollectionPage from "module/collection/page/CollectionPage";
import { CollectionDtoMock, NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import * as Router from "react-router-dom";

describe("Test for the CollectionPage", () => {
    describe("Collection render", () => {
        test("Renders correctly with nfts", async () => {
            jest.spyOn(Router, "useParams").mockReturnValue({ path: "path" });
            const collectionMock = new CollectionDtoMock();
            jest.spyOn(CollectionService, "collectionControllerGetCollectionByPath").mockResolvedValue(collectionMock);
            const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
            jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
            const screen = render(<CollectionPage />);

            // Header
            await waitFor(() => expect(screen.getAllByText(collectionMock.name!)).toHaveLength(2));

            // Content
            await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
        });
    });
});
