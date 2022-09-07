import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";
import { BaseNftsGridProps } from "./BaseNftGrid.types";
import NftCard from "../../display/NftCard/NftCard";
import useTranslate from "module/common/hook/useTranslate";

function BaseNftsGrid<T extends PaginatedData>({ data, loading, nothingToShow, ...rest }: BaseNftsGridProps<T>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const t = useTranslate("error");
    return (
        <BaseGrid
            cols={3}
            colGap={24}
            data={data}
            rowGap={24}
            breakpoints={breakpoints}
            nothingToShow={nothingToShow ?? t("nothingToShow")}
            Skeletons={BaseCardSkeletons}
            loading={loading}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </BaseGrid>
    );
}

export default BaseNftsGrid;
