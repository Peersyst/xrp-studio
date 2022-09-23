import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { useGetNftGridBreakpoints } from "../BaseNftGrid/hook/useGetNftGridBreakpoints";
import { BaseNftsGridProps } from "../BaseNftGrid/BaseNftGrid.types";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";

function BaseNftGridWithFilters<T extends PaginatedData>({ data, loading, ...rest }: BaseNftsGridProps<T>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <BaseGridWithFilters
            filters={<></>}
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
        </BaseGridWithFilters>
    );
}

export default BaseNftGridWithFilters;
