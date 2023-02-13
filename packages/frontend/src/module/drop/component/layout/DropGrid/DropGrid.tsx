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
import Button from "module/common/component/input/Button/Button";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import useDropGridConfig from "./hook/useDropGridConfig";

const DropGrid = ({ loading, nothingToShow, cols = 3, ...rest }: DropGridProps): JSX.Element => {
    const translateError = useTranslate("error");
    const translate = useTranslate();
    const navigate = useNavigate();

    const {
        nothingToShow: dropNothingToShow,
        cols: dropGridCols,
        breakpoints,
        tabletBreakpoint,
    } = useDropGridConfig({ nothingToShow, cols });

    const goToCreateCollection = () => {
        navigate(CollectionRoutes.CREATE_COLLECTION);
    };

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
            // nothingToShow={
            //     <NothingToShow label={translateError("youHaveNoDrops")}>
            //         <Button onClick={goToCreateCollection}>{translate("emptyDropMessage")}</Button>
            //     </NothingToShow>
            // }
            {...rest}
        >
            {(drops) => drops.map((drop: DropDto, key: Key | null | undefined) => <DropCard size="lg" drop={drop} key={key} />)}
        </Grid>
    );
};

export default DropGrid;
