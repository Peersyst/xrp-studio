import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import { BaseNftsGridProps } from "./BaseNftGrid.types";
import NftCard from "../../display/NftCard/NftCard";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";

function BaseNftsGrid({ data, loading, ...rest }: BaseNftsGridProps): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <BaseGrid
            cols={3}
            colGap={24}
            data={data}
            rowGap={"2rem"}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            loading={loading}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </BaseGrid>
    );
}

export default BaseNftsGrid;
