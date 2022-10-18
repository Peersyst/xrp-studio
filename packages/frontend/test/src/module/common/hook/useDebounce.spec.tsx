import { useDebounce } from "module/common/hook/useDebounce/useDebounce";
import { UseDebounceParams } from "module/common/hook/useDebounce/useDebounce.types";
import { act, renderHook, waitFor } from "test-utils";

const renderUseDebounce = ({ onQuery = jest.fn() }: Partial<UseDebounceParams> = {}) => renderHook(() => useDebounce({ onQuery }));

describe("useDebounce", () => {
    test("Return false by default", () => {
        const { result } = renderUseDebounce();
        expect(result.current.loading).toBe(false);
    });
    test("Return true when loading", async () => {
        const onQuery = jest.fn().mockReturnValue("test");
        const { result } = renderUseDebounce({ onQuery });

        expect(result.current.loading).toBe(false);
        expect(onQuery).toHaveBeenCalledTimes(0);
        expect(result.current.value).toBe("");

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
