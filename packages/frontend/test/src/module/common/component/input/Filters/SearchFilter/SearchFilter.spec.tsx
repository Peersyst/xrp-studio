import userEvent from "@testing-library/user-event";
import SearchFilter from "module/common/component/input/Filters/SearchFilter/SearchFilter";
import { UseFilterMock } from "test-mocks";
import { act, render, translate, waitFor } from "test-utils";

describe("Test for the SearchFilter", () => {
    test("Renders correcly without default value", () => {
        const name = "query";
        const screen = render(<SearchFilter name={name} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(input).toHaveValue("");
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
    });
    test("Renders correcly with default value and updates state", async () => {
        const key = "query";
        const { setFilter } = new UseFilterMock();
        const screen = render(<SearchFilter name={key} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        userEvent.type(input, "test");
        await act(async () => {
            await waitFor(() => expect(setFilter).toHaveBeenCalledWith("test"));
        });
    });
});
