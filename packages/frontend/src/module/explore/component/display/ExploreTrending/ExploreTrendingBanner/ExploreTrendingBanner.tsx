import { BaseExploreBanner } from "./ExploreTrendingBanner.styles";
import Link from "module/common/component/navigation/Link/Link";
import { ExploreTrendingBannerProps } from "module/explore/Explore.types";

const ExploreBanner = ({ src, to }: ExploreTrendingBannerProps): JSX.Element => {
    return (
        <Link to={to} variant="body2">
            <BaseExploreBanner src={src} alt={"Trending Top Banner"} height="22.5rem" />
        </Link>
    );
};

export default ExploreBanner;
