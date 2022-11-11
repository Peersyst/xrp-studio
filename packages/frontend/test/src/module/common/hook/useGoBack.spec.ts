import { renderHook } from "test-utils";
import useGoBack from "module/common/hook/useGoBack";
import * as ReactRouterDom from "react-router-dom";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";

const renderUseGoBack = () =>
    renderHook(() => {
        return useGoBack();
    }).result;

describe("useGoBack", () => {
    test("Goes back to home when do not have history", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const result = renderUseGoBack();
        result.current();
        expect(mockedNavigate).toHaveBeenCalledWith(DashboardRoutes.MAIN, { replace: true });
    });

    test("Goes back to home previous page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(window.history, "state", "get").mockReturnValue({ idx: 1 });
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const result = renderUseGoBack();
        result.current();
        expect(mockedNavigate).toHaveBeenCalledWith(-1);
    });
});
