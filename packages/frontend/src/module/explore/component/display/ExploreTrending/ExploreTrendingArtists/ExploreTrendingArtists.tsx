import { Col, Grid, Row, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingArtistsProps } from "module/explore/Explore.types";
import { useGetArtistsGridBreakpoints } from "module/explore/hook/useGetArtistsGridBreakpoints";
import ArtistCard from "module/landing/display/ArtistCard/ArtistCard";

const ExploreTrendingArtists = ({ artists = [], loading = false, ...rest }: ExploreTrendingArtistsProps): JSX.Element => {
    const translate = useTranslate();
    const breakpoints = useGetArtistsGridBreakpoints();
    return (
        <Col gap="1.5rem">
            <Skeleton loading={loading}>
                <Row gap={"1.5rem"}>
                    <Typography variant="h3" fontWeight={800}>
                        {translate("topArtistsThatUseXRPStudio")}
                    </Typography>
                </Row>
            </Skeleton>
            <Grid cols={6} css={{ width: "100%" }} justifyContent="stretch" {...rest} breakpoints={breakpoints}>
                {artists.slice(0, 6).map((artist, key) => (
                    <ArtistCard artist={artist} key={key} css={{ width: "100%" }} />
                ))}
            </Grid>
        </Col>
    );
};

export default ExploreTrendingArtists;
