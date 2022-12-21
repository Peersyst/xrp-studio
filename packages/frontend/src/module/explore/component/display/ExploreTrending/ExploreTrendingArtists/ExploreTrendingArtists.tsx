import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingComponentProps } from "module/explore/Explore.types";
import ArtistsCardCarousel from "module/landing/display/ArtistsCardCarousel/ArtistsCardCarousel";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";
import { useGetTrends } from "module/explore/query/useGetTrending";

const ExploreTrendingArtists = ({ ...rest }: ExploreTrendingComponentProps): JSX.Element => {
    const translate = useTranslate();

    const { data: { artists } = { artists: [] }, isLoading } = useGetTrends();
    return (
        <ExploreSection loading={isLoading} title={translate("topArtistsThatUseXRPStudio")} {...rest}>
            <ArtistsCardCarousel artists={artists} loading={isLoading} autoplay />
        </ExploreSection>
    );
};

export default ExploreTrendingArtists;
