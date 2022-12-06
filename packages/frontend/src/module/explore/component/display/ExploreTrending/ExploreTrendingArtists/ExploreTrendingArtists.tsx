import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingArtistsProps } from "module/explore/Explore.types";
import ArtistsCardCarousel from "module/landing/display/ArtistsCardCarousel/ArtistsCardCarousel";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";

const ExploreTrendingArtists = ({ artists = [], loading = false, ...rest }: ExploreTrendingArtistsProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <ExploreSection loading={loading} title={translate("topArtistsThatUseXRPStudio")} {...rest}>
            <ArtistsCardCarousel artists={artists} loading={loading} autoplay />
        </ExploreSection>
    );
};

export default ExploreTrendingArtists;
