import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import { UseSearchBarParams } from "module/common/component/input/SearchBar/hook/useSearchBar.types";
import { act, renderHook, waitFor } from "test-utils";

const renderUseSearchBar = ({ onQuery = jest.fn() }: Partial<UseSearchBarParams> = {}) => renderHook(() => useSearchBar({ onQuery }));

describe("useSearchBar", () => {
    test("Return false by default", () => {
        const { loading } = renderUseSearchBar().result.current;
        expect(loading).toBe(false);
    });
    test("Return true when loading", () => {
        act(async () => {
            const onQuery = jest.fn().mockReturnValue("test");
            const { loading, onChange, value } = renderUseSearchBar({ onQuery }).result.current;
            expect(loading).toBe(false);
            expect(onQuery).toHaveBeenCalledTimes(0);
            expect(value).toBeUndefined();
            onChange("test");
            await waitFor(() => {
                expect(loading).toBe(true);
                expect(onQuery).toHaveBeenCalled();
                expect(value).toBe("test");
            });
        });
    });
});
