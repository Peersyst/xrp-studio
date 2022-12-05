import ExploreTrendingBanner from "module/explore/component/display/ExploreTrending/ExploreTrendingBanner/ExploreTrendingBanner";
import { render } from "test-utils";

describe("ExploreBanner tests", () => {
    test("Renders correctly", async () => {
        const BANNER = {
            src: "https://s3-alpha-sig.figma.com/img/55e3/7d69/aba188a6309630e3ff78e633f21dd104?Expires=1671408000&Signature=JdXflCBVeJ8qjqf1RYRKs~nfevRpIQICvHlazKnTvfCI4lE-WeSw2nltOe9zRTYbJObrdzCk8Di3VLbHo-fROGHVHr5i-lFYoYjT0o4iHUPvCKqNFg45P0~5z0pdy-8b8VSu9l6qkKO8eVoWSMiPq3A7MJ-JSa-kBlJOT8qIjI20vcYrKqnX4lkIu-dASWqaNKshBQgD83onL9L6QfCdbkknvjE28NgbuWzhbSxGZtTj6MONpnR2pov0WwmjT3Z-x74F5KRclgjb-nbOjdyX4mwAuYCBtTTkfWcwax~nZqHmvMLNuxzqBRpWR5zM1fuS2WimW2856PyISMEbJ~frng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            to: "/",
        };

        const screen = render(<ExploreTrendingBanner src={BANNER.src} to={BANNER.to} />);

        const images = screen.getAllByRole("img");
        expect(images.some((image) => image.getAttribute("alt") === "Trending Top Banner")).toBe(true);
    });
});
