import ExploreTrendingCollections from "module/explore/component/display/ExploreTrending/ExploreTrendingCollections/ExploreTrendingCollections";
import { render, waitFor } from "test-utils";
import { TrendsDtoMock } from "test-mocks";
import { TrendService } from "module/api/service";

describe("ExplorerTrendingCollections tests", () => {
    test("Renders correctly", async () => {
        const trendsMock = new TrendsDtoMock({});
        const useGetTrendingMock = jest.spyOn(TrendService, "trendControllerGetTrends").mockResolvedValue(trendsMock);

        render(<ExploreTrendingCollections />);

        await waitFor(() => expect(useGetTrendingMock).toHaveBeenCalled());
    });
});
