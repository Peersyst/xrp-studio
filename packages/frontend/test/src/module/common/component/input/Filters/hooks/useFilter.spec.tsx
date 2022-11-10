import { renderHook } from "test-utils";
import useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import { UseSearchParamsMock } from "test-mocks";

const renderUseFilter = (name: string) => renderHook(() => useFilter({ name })).result;
describe("test for the useFilter hook", () => {
    test("Works correctly", () => {
        new UseSearchParamsMock({ name: "1", order: "ASC" });
        const { current } = renderUseFilter("name");
        expect(current).toEqual(["1", expect.any(Function)]);
    });
});
