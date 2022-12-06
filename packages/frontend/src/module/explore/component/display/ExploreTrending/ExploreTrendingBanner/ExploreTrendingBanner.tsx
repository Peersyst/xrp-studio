import { ExploreBannerRoot } from "./ExploreTrendingBanner.styles";
import { ExploreTrendingBannerProps } from "module/explore/Explore.types";
import { Link } from "react-router-dom";

const ExploreBanner = ({ src, to }: ExploreTrendingBannerProps): JSX.Element => {
    return (
        <Link to={to}>
            <ExploreBannerRoot src={src} alt="explore-banner" />
        </Link>
    );
};

export default ExploreBanner;
