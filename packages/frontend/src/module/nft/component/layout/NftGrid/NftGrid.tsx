import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";

function NftGrid<TagT>({ loading, ...rest }: NftGridProps<TagT>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <Grid<PaginatedNftDto, TagT>
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            css={{ width: "100%" }}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

export default NftGrid;
