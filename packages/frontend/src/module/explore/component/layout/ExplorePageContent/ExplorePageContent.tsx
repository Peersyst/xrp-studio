import PageContent from "module/common/component/layout/PageContent/PageContent";
import { Col, TabPanel } from "@peersyst/react-components";
import ExploreCollectionsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreCollectionsGrid";
import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";
import { useGetTrends } from "module/explore/query/useGetTrending";
import ExploreTrendingCollections from "../../display/ExploreTrending/ExploreTrendingCollections/ExploreTrendingCollections";
import ExploreTrendingBanner from "../../display/ExploreTrending/ExploreTrendingBanner/ExploreTrendingBanner";
import ExploreTrendingNfts from "../../display/ExploreTrending/ExploreTrendingNfts/ExploreTrendingNfts";

const ExplorePageContent = (): JSX.Element => {
    const { data: { nfts, artists, collections } = { nfts: [], artists: [], collections: [] }, isLoading } = useGetTrends();

    const BANNER = {
        src: "https://s3-alpha-sig.figma.com/img/55e3/7d69/aba188a6309630e3ff78e633f21dd104?Expires=1671408000&Signature=JdXflCBVeJ8qjqf1RYRKs~nfevRpIQICvHlazKnTvfCI4lE-WeSw2nltOe9zRTYbJObrdzCk8Di3VLbHo-fROGHVHr5i-lFYoYjT0o4iHUPvCKqNFg45P0~5z0pdy-8b8VSu9l6qkKO8eVoWSMiPq3A7MJ-JSa-kBlJOT8qIjI20vcYrKqnX4lkIu-dASWqaNKshBQgD83onL9L6QfCdbkknvjE28NgbuWzhbSxGZtTj6MONpnR2pov0WwmjT3Z-x74F5KRclgjb-nbOjdyX4mwAuYCBtTTkfWcwax~nZqHmvMLNuxzqBRpWR5zM1fuS2WimW2856PyISMEbJ~frng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        to: "/",
    };

    return (
        <>
            <TabPanel index={0}>
                <PageContent>
                    <Col gap={"5.5rem"}>
                        <ExploreTrendingBanner src={BANNER.src} to={BANNER.to} />
                        <ExploreTrendingCollections loading={isLoading} collections={collections} />
                        <ExploreTrendingNfts loading={isLoading} nfts={nfts} />
                    </Col>
                </PageContent>
            </TabPanel>
            <TabPanel index={1}>
                <PageContent>
                    <ExploreCollectionsGrid />
                </PageContent>
            </TabPanel>
            <TabPanel index={2}>
                <PageContent>
                    <ExploreNftGrid />
                </PageContent>
            </TabPanel>
        </>
    );
};

export default ExplorePageContent;
