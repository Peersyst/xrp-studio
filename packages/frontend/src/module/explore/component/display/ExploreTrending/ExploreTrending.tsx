import ExploreTrendingBanner from "module/explore/component/display/ExploreTrending/ExploreTrendingBanner/ExploreTrendingBanner";
import ExploreTrendingCollections from "module/explore/component/display/ExploreTrending/ExploreTrendingCollections/ExploreTrendingCollections";
import ExploreTrendingNfts from "module/explore/component/display/ExploreTrending/ExploreTrendingNfts/ExploreTrendingNfts";
import ExploreTrendingArtists from "module/explore/component/display/ExploreTrending/ExploreTrendingArtists/ExploreTrendingArtists";
import { Col } from "@peersyst/react-components";
import ExploreTrendingDrops from "./ExploreTrendingDrops/ExploreTrendingDrops";

const ExploreTrending = (): JSX.Element => {
    const BANNER = {
        src: "https://xrp-studio-production.s3.eu-west-1.amazonaws.com/banner-lorenzo.png",
        to: "https://www.instagram.com/lorenzoquinnartist",
    };

    return (
        <Col gap={"5.5rem"}>
            <ExploreTrendingBanner src={BANNER.src} to={BANNER.to} />
            <ExploreTrendingDrops />
            <ExploreTrendingCollections />
            <ExploreTrendingNfts />
            <ExploreTrendingArtists />
        </Col>
    );
};

export default ExploreTrending;
