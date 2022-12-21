import { Grid } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingComponentProps } from "module/explore/Explore.types";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";
import { NftCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetTrends } from "module/explore/query/useGetTrending";

const ExploreTrendingNfts = ({ ...rest }: ExploreTrendingComponentProps): JSX.Element => {
    const translate = useTranslate();
    const breakpoints = useGetNftGridBreakpoints();

    const { data: { nfts } = { nfts: [] }, isLoading } = useGetTrends();

    return (
        <ExploreSection loading={isLoading} title={translate("theNfts")} viewMoreLink={ExploreRoutes.NFTS} {...rest}>
            <Grid cols={4} css={{ width: "100%" }} justifyContent="stretch" breakpoints={breakpoints}>
                {isLoading ? (
                    <NftCardSkeletons count={8} />
                ) : (
                    nfts.slice(0, 8).map((nft, key) => <NftCard nft={nft} key={key} css={{ width: "100%" }} />)
                )}
            </Grid>
        </ExploreSection>
    );
};

export default ExploreTrendingNfts;
