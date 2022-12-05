import { BaseExploreBanner } from "./ExploreBanner.styles";
import { ExploreBannerProps } from "./ExploreBanner.types";
import Link from "module/common/component/navigation/Link/Link";

const ExploreBanner = ({ src, to }: ExploreBannerProps): JSX.Element => {
    return (
        <Link to={to} variant="body2">
            <BaseExploreBanner src={src} alt={"Trending Top Banner"} height="22.5rem" />
        </Link>
    );
};

export default ExploreBanner;
