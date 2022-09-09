import ArrowButton from "module/common/component/input/ArrowButton/ArrowButton";
import { fireEvent, render } from "test-utils";

describe("Test for the Arrow Button component", () => {
    test("Renders left component", () => {
        const mockedOnClick = jest.fn();
        const { getByRole } = render(<ArrowButton direction="left" onClick={mockedOnClick} />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        const icon = btn.getElementsByTagName("svg")[0];
        expect(icon).toHaveAttribute("data-testid", "ChevronLeftIcon");
        fireEvent.click(btn);
        expect(mockedOnClick).toHaveBeenCalledTimes(1);
    });
    test("Renders right component", () => {
        const mockedOnClick = jest.fn();
        const { getByRole } = render(<ArrowButton direction="right" onClick={mockedOnClick} />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        const icon = btn.getElementsByTagName("svg")[0];
        expect(icon).toHaveAttribute("data-testid", "ChevronRightIcon");
        fireEvent.click(btn);
        expect(mockedOnClick).toHaveBeenCalledTimes(1);
    });
});
