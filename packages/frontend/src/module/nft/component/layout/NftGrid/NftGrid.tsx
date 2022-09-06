import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";

function NftsGrid<T extends PaginatedData>(props: ExposedBaseGridProps<T>): JSX.Element {
    return (
        <BaseGridWithFilters
            filters={<>Hola Mundo</>}
            cols={3}
            colGap={24}
            rowGap={24}
            breakpoints={[
                { maxWidth: 13000, cols: 4 },
                { maxWidth: 1400, cols: 3 },
                { maxWidth: 1100, cols: 2 },
                { maxWidth: 767, cols: 1 },
            ]}
            Skeletons={BaseCardSkeletons}
            {...props}
        />
    );
}

export default NftsGrid;
