import theme from "config/theme/theme";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";
import { act, renderHook } from "test-utils";

const renderUseGetNftGridBreakpoints = () =>
    renderHook(() => {
        return useGetNftGridBreakpoints();
    });

describe("useGetNftGridBreakpoints test", () => {
    test("Trigger singin correctly", () => {
        const nftsGrid = theme.breakpoints.values.nftsGrid;
        act(() => {
            const breakpoints = renderUseGetNftGridBreakpoints().result.current;
            expect(breakpoints).toEqual([
                { maxWidth: nftsGrid.xxxl, cols: 10 },
                { maxWidth: nftsGrid.xxl, cols: 8 },
                { maxWidth: nftsGrid.xl, cols: 5 },
                { maxWidth: nftsGrid.lg, cols: 4 },
                { maxWidth: nftsGrid.md, cols: 3 },
                { maxWidth: nftsGrid.mobile, cols: 2 },
                { maxWidth: nftsGrid.mobileSm, cols: 1 },
            ]);
        });
    });
});
