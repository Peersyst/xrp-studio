import * as ReactComponents from "@peersyst/react-components";
import { render } from "test-utils";
import userEvent from "@testing-library/user-event";
import AppBar from "module/common/component/navigation/AppBar/AppBar";

describe("ThemeButton test", () => {
    test("Call setTheme correctly", () => {
        const mockedValue = jest.fn();
        jest.spyOn(ReactComponents, "useSetTheme").mockReturnValue(mockedValue);

        const screen = render(<AppBar />);
        const button = screen.getByTestId("MoonIcon");
        userEvent.click(button);
        expect(mockedValue).toBeCalled();
    });
});
