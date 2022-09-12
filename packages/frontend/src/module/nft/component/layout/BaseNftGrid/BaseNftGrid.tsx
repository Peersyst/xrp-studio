import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";
import { BaseNftsGridProps } from "./BaseNftGrid.types";
import NftCard from "../../display/NftCard/NftCard";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";

function BaseNftsGrid<T extends PaginatedData>({ data, loading, ...rest }: BaseNftsGridProps<T>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <BaseGridWithFilters
            filters={<>hola</>}
            tags={["Bears", "Okey Bears", "Okeys Beards Contemporany"]}
            onTagClicked={(tag) => window.alert(tag)}
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

export default BaseNftsGrid;
