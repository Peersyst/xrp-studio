import ExploreTrendingCollections from "module/explore/component/display/ExploreTrending/ExploreTrendingCollections/ExploreTrendingCollections";
import { render, waitFor } from "test-utils";
import { TrendsDtoMock } from "test-mocks";

describe("ExplorerTrendingCollections tests", () => {
    test("Renders correctly", async () => {
        const { mock } = new TrendsDtoMock({});

        render(<ExploreTrendingCollections />);

        await waitFor(() => expect(mock).toHaveBeenCalled());
    });
});
