import { Col, Grid, Row, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingNftsProps } from "module/explore/Explore.types";
import Link from "module/common/component/navigation/Link/Link";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";

const ExploreTrendingNfts = ({ nfts = [], loading = false, ...rest }: ExploreTrendingNftsProps): JSX.Element => {
    const translate = useTranslate();
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <Col gap="1.5rem">
            <Skeleton loading={loading}>
                <Row gap={"1.5rem"}>
                    <Typography variant="h3" fontWeight={800}>
                        {translate("theNfts")}
                    </Typography>
                    <Link
                        to={ExploreRoutes.NFTS}
                        variant="h6"
                        fontWeight={500}
                        color={"status.info"}
                        style={{ alignItems: "center" }}
                        type="router"
                    >
                        {translate("viewAll")}
                    </Link>
                </Row>
            </Skeleton>
            <Grid cols={4} css={{ width: "100%" }} justifyContent="stretch" {...rest} breakpoints={breakpoints}>
                {nfts.slice(0, 8).map((nft, key) => (
                    <NftCard nft={nft} key={key} css={{ width: "100%" }} />
                ))}
            </Grid>
        </Col>
    );
};

export default ExploreTrendingNfts;
