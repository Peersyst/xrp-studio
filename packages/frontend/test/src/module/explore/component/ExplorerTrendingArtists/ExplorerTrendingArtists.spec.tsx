import ExploreTrendingArtists from "module/explore/component/display/ExploreTrending/ExploreTrendingArtists/ExploreTrendingArtists";
import { render, waitFor } from "test-utils";
import { UserDtoMock } from "../../../../../__mocks__/dto";

describe("ExplorerTrendingArtists tests", () => {
    test("Renders correctly", async () => {
        const artists = [new UserDtoMock(), new UserDtoMock(), new UserDtoMock()];
        const screen = render(<ExploreTrendingArtists artists={artists} />);

        await waitFor(() => expect(screen.getAllByAltText("artist-image")).toHaveLength(3));
    });
});
