import ExploreTrendingNfts from "module/explore/component/display/ExploreTrending/ExploreTrendingNfts/ExploreTrendingNfts";
import { render, waitFor } from "test-utils";
import { TrendService } from "module/api/service";
import { TrendsDtoMock } from "test-mocks";

describe("ExplorerTrendingNfts tests", () => {
    test("Renders correctly", async () => {
        const trendsMock = new TrendsDtoMock({});
        const useGetTrendingMock = jest.spyOn(TrendService, "trendControllerGetTrends").mockResolvedValue(trendsMock);

        render(<ExploreTrendingNfts />);

        await waitFor(() => expect(useGetTrendingMock).toHaveBeenCalled());
    });
});
