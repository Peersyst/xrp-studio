import Grid from "module/common/component/layout/Grid/Grid";
import { DropGridProps } from "module/drop/component/layout/DropGrid/DropGrid.types";
import { CollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { DropDto } from "module/api/service";
import { Key } from "react";
import DropCard from "module/drop/component/display/DropCard/DropCard";
import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import useDropGridConfig from "./hook/useDropGridConfig";

const DropGrid = ({ loading, nothingToShow, cols = 3, withFilters, ...rest }: DropGridProps): JSX.Element => {
    const {
        nothingToShow: dropNothingToShow,
        cols: dropGridCols,
        breakpoints,
        tabletBreakpoint,
    } = useDropGridConfig({ nothingToShow, cols, withFilters });

    return (
        <Grid<PaginatedDropDto>
            loading={loading}
            cols={dropGridCols}
            breakpoints={breakpoints}
            tabletBreakPoint={tabletBreakpoint}
            Skeletons={CollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            alignItems="flex-start"
            nothingToShow={dropNothingToShow}
            withFilters={withFilters}
            {...rest}
        >
            {(drops) => drops.map((drop: DropDto, key: Key | null | undefined) => <DropCard size="lg" drop={drop} key={key} />)}
        </Grid>
    );
};

export default DropGrid;
