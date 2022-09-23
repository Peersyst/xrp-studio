import { useTheme } from "@peersyst/react-components";
import { GridProps } from "@peersyst/react-components";

export type NftGridBreakpoints = GridProps["breakpoints"];

export const useGetNftGridBreakpoints = (): NftGridBreakpoints => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    return [
        { maxWidth: nftsGrid.xl, cols: 3 },
        { maxWidth: nftsGrid.xs, cols: 2 },
        { maxWidth: nftsGrid.xxs, cols: 1 },
    ];
};
