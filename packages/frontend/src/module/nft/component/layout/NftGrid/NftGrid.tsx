import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";

function NftsGrid<T extends PaginatedData>(props: ExposedBaseGridProps<T>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return <BaseGrid cols={3} colGap={24} rowGap={24} breakpoints={breakpoints} Skeletons={BaseCardSkeletons} {...props} />;
}

export default NftsGrid;
