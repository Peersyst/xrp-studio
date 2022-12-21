import ExploreTrendingNfts from "module/explore/component/display/ExploreTrending/ExploreTrendingNfts/ExploreTrendingNfts";
import { render, waitFor } from "test-utils";
import { TrendsDtoMock } from "test-mocks";

describe("ExplorerTrendingNfts tests", () => {
    test("Renders correctly", async () => {
        const { mock } = new TrendsDtoMock({});

        render(<ExploreTrendingNfts />);

        await waitFor(() => expect(mock).toHaveBeenCalled());
    });
});
