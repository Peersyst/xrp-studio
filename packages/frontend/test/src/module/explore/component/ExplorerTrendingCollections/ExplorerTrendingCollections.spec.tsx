import ExploreTrendingCollections from "module/explore/component/display/ExploreTrending/ExploreTrendingCollections/ExploreTrendingCollections";
import { render, waitFor } from "test-utils";
import { CollectionsDtoMock } from "../../../../../__mocks__/dto";

describe("ExplorerTrendingCollections tests", () => {
    test("Renders correctly", async () => {
        const { collections } = new CollectionsDtoMock({ length: 10 });
        const screen = render(<ExploreTrendingCollections collections={collections} />);

        await waitFor(() => expect(screen.getAllByText("collection_name")).toHaveLength(3));
    });
});
