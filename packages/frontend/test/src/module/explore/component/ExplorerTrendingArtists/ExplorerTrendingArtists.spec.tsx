import ExploreTrendingArtists from "module/explore/component/display/ExploreTrending/ExploreTrendingArtists/ExploreTrendingArtists";
import { render, waitFor } from "test-utils";
import { TrendsDtoMock } from "test-mocks";
import { TrendService } from "module/api/service";

describe("ExplorerTrendingArtists tests", () => {
    test("Renders correctly", async () => {
        const trendsMock = new TrendsDtoMock({});
        const useGetTrendingMock = jest.spyOn(TrendService, "trendControllerGetTrends").mockResolvedValue(trendsMock);

        render(<ExploreTrendingArtists />);

        await waitFor(() => expect(useGetTrendingMock).toHaveBeenCalled());
    });
});
