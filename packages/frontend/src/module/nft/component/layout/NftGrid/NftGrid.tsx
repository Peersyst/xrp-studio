import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";

function NftGrid<TagT, F>({ loading, ...rest }: NftGridProps<TagT, F>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <Grid<PaginatedNftDto, TagT, F> loading={loading} breakpoints={breakpoints} Skeletons={BaseCardSkeletons} {...rest}>
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

export default NftGrid;
