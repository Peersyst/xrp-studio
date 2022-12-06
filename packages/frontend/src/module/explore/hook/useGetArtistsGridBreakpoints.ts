import { useTheme } from "@peersyst/react-components";
import { GridProps } from "@peersyst/react-components";

export type NftGridBreakpoints = GridProps["breakpoints"];

export const useGetArtistsGridBreakpoints = (): NftGridBreakpoints => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    return [
        { maxWidth: nftsGrid.sm, cols: 4 },
        { maxWidth: nftsGrid.xs, cols: 2 },
        { maxWidth: nftsGrid.xxs, cols: 2 },
    ];
};
