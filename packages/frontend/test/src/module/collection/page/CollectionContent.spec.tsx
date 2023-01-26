import { CollectionService, NftService } from "module/api/service";
import { CollectionDtoMock, NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import CollectionContent from "module/collection/component/layout/CollectionContent/CollectionContent";

describe("Test for the Collection Content", () => {
    describe("Collection Content render", () => {
        test("Renders Grid of NFTs", async () => {
            jest.spyOn(Router, "useParams").mockReturnValue({ path: "path" });
            jest.spyOn(CollectionService, "collectionControllerGetCollectionByPath").mockResolvedValue(new CollectionDtoMock());
            const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
            jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
            const screen = render(<CollectionContent />);
            //Grid
            await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
        });
    });
});
