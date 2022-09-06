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
        { maxWidth: nftsGrid.xxxl, cols: 10 },
        { maxWidth: nftsGrid.xxl, cols: 8 },
        { maxWidth: nftsGrid.xl, cols: 5 },
        { maxWidth: nftsGrid.lg, cols: 4 },
        { maxWidth: nftsGrid.md, cols: 3 },
        { maxWidth: nftsGrid.mobile, cols: 2 },
        { maxWidth: nftsGrid.mobileSm, cols: 1 },
    ];
};
