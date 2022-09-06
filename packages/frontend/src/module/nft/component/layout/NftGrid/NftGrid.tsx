import { PaginatedData } from "query-utils";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";
import { useTheme } from "@peersyst/react-components";

function NftsGrid<T extends PaginatedData>(props: ExposedBaseGridProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    return (
        <BaseGridWithFilters
            filters={<>Hola Mundo</>}
            cols={3}
            colGap={24}
            rowGap={24}
            breakpoints={[
                { maxWidth: nftsGrid.xxxl, cols: 10 },
                { maxWidth: nftsGrid.xxl, cols: 8 },
                { maxWidth: nftsGrid.xl, cols: 5 },
                { maxWidth: nftsGrid.lg, cols: 4 },
                { maxWidth: nftsGrid.md, cols: 3 },
                { maxWidth: nftsGrid.mobile, cols: 2 },
                { maxWidth: nftsGrid.mobileSm, cols: 1 },
            ]}
            Skeletons={BaseCardSkeletons}
            {...props}
        />
    );
}

export default NftsGrid;
