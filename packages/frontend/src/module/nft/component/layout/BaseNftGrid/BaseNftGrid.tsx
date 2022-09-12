import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";
import { BaseNftsGridProps } from "./BaseNftGrid.types";
import NftCard from "../../display/NftCard/NftCard";

function BaseNftsGrid<T extends PaginatedData>({ data, loading, ...rest }: BaseNftsGridProps<T>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <BaseGrid
            cols={3}
            colGap={24}
            data={data}
            rowGap={60}
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
