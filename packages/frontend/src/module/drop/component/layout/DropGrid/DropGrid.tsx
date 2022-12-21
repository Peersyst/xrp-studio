import Grid from "module/common/component/layout/Grid/Grid";

import { DropGridProps } from "module/drop/component/layout/DropGrid/DropGrid.types";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { CollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { DropDto } from "module/api/service";
import { Key } from "react";
import DropCard from "module/drop/component/display/DropCard/DropCard";
import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useTranslate from "module/common/hook/useTranslate";

const DropGrid = ({ loading, ...rest }: DropGridProps): JSX.Element => {
    const breakpoints = useCollectionGridBreakpoints();
    const translateError = useTranslate("error");

    return (
        <Grid<PaginatedDropDto>
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={CollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            nothingToShow={<NothingToShow label={translateError("youHaveNoDrops")} />}
            {...rest}
        >
            {(drops) => drops.map((drop: DropDto, key: Key | null | undefined) => <DropCard size="lg" drop={drop} key={key} />)}
        </Grid>
    );
};

export default DropGrid;
