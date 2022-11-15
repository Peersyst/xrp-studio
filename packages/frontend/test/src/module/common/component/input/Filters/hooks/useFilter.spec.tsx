import { renderHook } from "test-utils";
import useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import { UseSearchParamsMock } from "test-mocks";

const renderUseFilter = (name: string, multiple: boolean = false) => renderHook(() => useFilter(name, { multiple })).result;

describe("useFilter", () => {
    test("Returns value", () => {
        new UseSearchParamsMock({ name: "1", order: "ASC" });
        const { current: current1 } = renderUseFilter("name");
        expect(current1).toEqual(["1", expect.any(Function)]);
        const { current } = renderUseFilter("order");
        expect(current).toEqual(["ASC", expect.any(Function)]);
    });

    test("Returns value", () => {
        const values = ["1", "2"];
        new UseSearchParamsMock({ name: values, order: "ASC" });
        const { current } = renderUseFilter("name", true);
        expect(current).toEqual([values, expect.any(Function)]);
    });
});
