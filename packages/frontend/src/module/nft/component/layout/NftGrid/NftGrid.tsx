import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";

function NftsGrid<T extends PaginatedData>(props: ExposedBaseGridProps<T>): JSX.Element {
    return (
        <BaseGridWithFilters<T>
            filterBreakpoints={[
                { maxWidth: 1400, cols: 3 },
                { maxWidth: 1100, cols: 2 },
                { maxWidth: 600, cols: 2 },
                { maxWidth: 400, cols: 1 },
            ]}
            filters={<>Hola Mundo</>}
            cols={5}
            colGap={24}
            rowGap={24}
            breakpoints={[
                { maxWidth: 1400, cols: 5 },
                { maxWidth: 1100, cols: 2 },
                { maxWidth: 600, cols: 2 },
                { maxWidth: 400, cols: 1 },
            ]}
            Skeletons={BaseCardSkeletons}
            {...props}
        />
    );
}

export default NftsGrid;
