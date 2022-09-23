import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { useGetNftGridBreakpoints } from "../BaseNftGrid/hook/useGetNftGridBreakpoints";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";
import { BaseNftsGridWithFiltersProps } from "./BaseNftsGridWithFilters.types";
import { PaginatedNftDto } from "module/api/service";

function BaseNftGridWithFilters<TagT>({ data, loading, ...rest }: BaseNftsGridWithFiltersProps<TagT>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <BaseGridWithFilters<PaginatedNftDto, TagT>
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
