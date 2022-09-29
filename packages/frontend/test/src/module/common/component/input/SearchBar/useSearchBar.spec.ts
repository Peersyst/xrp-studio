import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import { UseSearchBarParams } from "module/common/component/input/SearchBar/hook/useSearchBar.types";
import { act, renderHook, waitFor } from "test-utils";

const renderUseSearchBar = ({ onQuery = jest.fn() }: Partial<UseSearchBarParams> = {}) => renderHook(() => useSearchBar({ onQuery }));

describe("useSearchBar", () => {
    test("Return false by default", () => {
        const { result } = renderUseSearchBar();
        expect(result.current.loading).toBe(false);
    });
    test("Return true when loading", async () => {
        const onQuery = jest.fn().mockReturnValue("test");
        const { result } = renderUseSearchBar({ onQuery });

        expect(result.current.loading).toBe(false);
        expect(onQuery).toHaveBeenCalledTimes(0);
        expect(result.current.value).toBeUndefined();

        act(() => {
            result.current.onChange("test");
        });

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(onQuery).toHaveBeenCalled();
            expect(result.current.value).toBe("test");
        });
    });
});
