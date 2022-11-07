import { GridProps, useTheme } from "@peersyst/react-components";

export type CollectionGridBreakpoints = GridProps["breakpoints"];

export const useCollectionGridBreakpoints = (): CollectionGridBreakpoints => {
    const {
        breakpoints: {
            values: { collectionsGrid },
        },
    } = useTheme();
    return [
        { maxWidth: collectionsGrid.xs, cols: 2 },
        { maxWidth: collectionsGrid.xxs, cols: 1 },
    ];
};
