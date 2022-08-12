import { PaginatedData } from "query-utils";
import Skeletons from "module/common/component/feedback/Skeletons/Skeletons";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";

function NftsGrid<T extends PaginatedData>(props: ExposedBaseGridProps<T>): JSX.Element {
    return (
        <BaseGrid
            cols={6}
            colGap={24}
            rowGap={24}
            breakpoints={[
                { maxWidth: 13000, cols: 5 },
                { maxWidth: 1200, cols: 4 },
                { maxWidth: 800, cols: 3 },
                { maxWidth: 600, cols: 2 },
                { maxWidth: 400, cols: 1 },
            ]}
            Skeletons={Skeletons}
            {...props}
        />
    );
}

export default NftsGrid;
