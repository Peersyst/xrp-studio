import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingArtistsProps } from "module/explore/Explore.types";
import ArtistsCardCarousel from "module/landing/display/ArtistsCardCarousel/ArtistsCardCarousel";
import { ContentArtistsCardCarousel } from "./ExploreTrendingArtists.styles";

const ExploreTrendingArtists = ({ artists = [], loading = false, ...rest }: ExploreTrendingArtistsProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Row gap={"1.5rem"}>
                    <Typography variant="h3" fontWeight={800}>
                        {translate("topArtistsThatUseXRPStudio")}
                    </Typography>
                </Row>
            </Skeleton>
            <ContentArtistsCardCarousel as={Col} gap="3rem">
                <ArtistsCardCarousel artists={artists} loading={loading} autoplay />
            </ContentArtistsCardCarousel>
        </Col>
    );
};

export default ExploreTrendingArtists;
