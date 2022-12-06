import { Grid } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingNftsProps } from "module/explore/Explore.types";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";

const ExploreTrendingNfts = ({ nfts = [], loading = false, ...rest }: ExploreTrendingNftsProps): JSX.Element => {
    const translate = useTranslate();
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <ExploreSection loading={loading} title={translate("theNfts")} viewMoreLink={ExploreRoutes.NFTS} {...rest}>
            <Grid cols={4} css={{ width: "100%" }} justifyContent="stretch" breakpoints={breakpoints}>
                {nfts.slice(0, 8).map((nft, key) => (
                    <NftCard nft={nft} key={key} css={{ width: "100%" }} />
                ))}
            </Grid>
        </ExploreSection>
    );
};

export default ExploreTrendingNfts;
