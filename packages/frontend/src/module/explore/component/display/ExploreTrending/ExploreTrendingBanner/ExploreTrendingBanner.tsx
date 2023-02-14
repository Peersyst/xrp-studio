import { ExploreBannerRoot } from "./ExploreTrendingBanner.styles";
import { ExploreTrendingBannerProps } from "module/explore/Explore.types";

const ExploreBanner = ({ src, to }: ExploreTrendingBannerProps): JSX.Element => {
    return (
        <a href={to} target="_blank">
            <ExploreBannerRoot src={src} alt="explore-banner" />
        </a>
    );
};

export default ExploreBanner;
