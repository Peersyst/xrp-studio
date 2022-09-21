import userEvent from "@testing-library/user-event";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import { render, translate, waitFor } from "test-utils";

describe("Test for the SearchBar component", () => {
    test("Renders correctly", () => {
        const screen = render(<SearchBar label="label" />);
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText("label")).toBeInTheDocument();
    });
    test("Renders correctly with loading", () => {
        const screen = render(<SearchBar loading />);
        expect(screen.getByTestId("LoaderIcon")).toBeInTheDocument();
    });
    test("Renders correctly with value", async () => {
        const mockedOnChange = jest.fn();
        const screen = render(<SearchBar onChange={mockedOnChange} />);
        const input = screen.getByRole("textbox");
        userEvent.type(input, "test");
        expect(input).toHaveValue("test");
        //Wait for the debounce
        await waitFor(() => {
            expect(mockedOnChange).toHaveBeenCalledTimes(1);
        });
    });
});
