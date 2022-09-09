import BackButton from "module/common/component/navigation/BackButton/BackButton";
import { fireEvent, render } from "test-utils";
import * as ReactRouterDom from "react-router-dom";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";

describe("BackButton test", () => {
    test("Renders correctly", () => {
        const { getByRole } = render(<BackButton />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        const icon = btn.getElementsByTagName("svg")[0];
        expect(icon).toHaveAttribute("data-testid", "ChevronLeftIcon");
    });

    test("Goes back to home when do not have history", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const { getByRole } = render(<BackButton />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedNavigate).toHaveBeenCalledWith(DashboardRoutes.MAIN);
    });

    test("Goes back to home previous page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(window.history, "state", "get").mockReturnValue({ idx: 1 });
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const { getByRole } = render(<BackButton />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedNavigate).toHaveBeenCalledWith(-1);
    });
});
