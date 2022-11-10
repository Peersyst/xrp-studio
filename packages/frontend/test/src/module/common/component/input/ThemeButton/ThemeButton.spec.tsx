import * as ReactComponents from "@peersyst/react-components";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";
import ThemeButton from "module/common/component/input/ThemeButton/ThemeButton";

describe("ThemeButton test", () => {
    test("Call setTheme correctly", () => {
        const mockedSetTheme = jest.fn();
        jest.spyOn(ReactComponents, "useSetTheme").mockReturnValue(mockedSetTheme);
        render(<ThemeButton />);
        const button = screen.getByRole("button");
        userEvent.click(button);
        expect(mockedSetTheme).toHaveBeenCalled();
    });
});
