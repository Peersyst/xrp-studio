import ExploreTrendingArtists from "module/explore/component/display/ExploreTrending/ExploreTrendingArtists/ExploreTrendingArtists";
import { render, waitFor } from "test-utils";
import { TrendsDtoMock } from "test-mocks";

describe("ExplorerTrendingArtists tests", () => {
    test("Renders correctly", async () => {
        const { mock } = new TrendsDtoMock({});

        render(<ExploreTrendingArtists />);

        await waitFor(() => expect(mock).toHaveBeenCalled());
    });
});
