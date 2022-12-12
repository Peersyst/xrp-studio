import ExploreTrendingNfts from "module/explore/component/display/ExploreTrending/ExploreTrendingNfts/ExploreTrendingNfts";
import { render, waitFor } from "test-utils";
import { NftsDtoMock } from "../../../../../__mocks__/dto";

describe("ExplorerTrendingNfts tests", () => {
    test("Renders correctly", async () => {
        const { nfts } = new NftsDtoMock({ length: 10 });
        const screen = render(<ExploreTrendingNfts nfts={nfts} />);

        await waitFor(() => expect(screen.getAllByRole("heading", { name: nfts[0].metadata?.name })).toHaveLength(8));
    });
});
