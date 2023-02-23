import { ReactNode } from "react";
import useTranslate from "module/common/hook/useTranslate";
import useCollectionFilters from "module/collection/hook/useCollectionFilters";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { GridBreakpoint, useTheme } from "@peersyst/react-components";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";

interface UseCollectionGridConfigReturn extends Omit<UseCollectionGridConfigParams, "withFilters"> {
    breakpoints: GridBreakpoint[] | undefined;
    tabletBreakpoint: number;
}

export interface UseCollectionGridConfigParams {
    nothingToShow: string | ReactNode;
    cols: number;
    withFilters: boolean;
}

export default function ({ nothingToShow, cols, withFilters }: UseCollectionGridConfigParams): UseCollectionGridConfigReturn {
    const translateError = useTranslate("error");
    const breakpoints = useCollectionGridBreakpoints();
    const {
        breakpoints: {
            values: { filters },
        },
    } = useTheme();

    const gridFilters = useCollectionFilters();
    const [hideFiltersState] = useRecoilState(filtersVisibilityState);

    const hasFilters = !!gridFilters.query;

    const collectionNothingToShow = hasFilters ? translateError("noMatchingCollections") : nothingToShow;
    const collectionGridCols = withFilters && hideFiltersState ? 2 : cols;

    return {
        nothingToShow: collectionNothingToShow,
        cols: collectionGridCols,
        breakpoints,
        tabletBreakpoint: filters,
    };
}
