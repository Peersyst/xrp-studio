import { ReactNode } from "react";
import useTranslate from "module/common/hook/useTranslate";
import useCollectionFilters from "module/collection/hook/useCollectionFilters";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";

interface UseCollectionGridConfigReturn {
    nothingToShow: string | ReactNode;
    cols: number;
}

export type UseCollectionGridConfigParams = UseCollectionGridConfigReturn;

export default function ({ nothingToShow, cols }: UseCollectionGridConfigParams): UseCollectionGridConfigReturn {
    const translateError = useTranslate("error");

    const gridFilters = useCollectionFilters();
    const [hideFiltersState] = useRecoilState(filtersVisibilityState);

    const hasFilters = !!gridFilters.query;

    const collectionNothingToShow = hasFilters ? translateError("noMatchingCollections") : nothingToShow;
    const collectionGridCols = hideFiltersState ? 2 : cols;

    return {
        nothingToShow: collectionNothingToShow,
        cols: collectionGridCols,
    };
}
