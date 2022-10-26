import userEvent from "@testing-library/user-event";
import SearchFilter from "module/common/component/input/Filters/SearchFilter/SearchFilter";
import { UseFilterMock } from "test-mocks";
import { act, render, translate, waitFor } from "test-utils";

describe("Test for the SearchFilter", () => {
    test("Renders correcly without default value", () => {
        const name = "query";
        new UseFilterMock();
        const screen = render(<SearchFilter name={name} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(input).toHaveValue("");
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
    });
    test("Renders correcly with default value and updates state", async () => {
        const key = "query";
        const value = "default_query";
        const queryFilter = { [key]: value };
        const mockedSetFilters = jest.fn();
        new UseFilterMock({ filters: queryFilter, setFilters: mockedSetFilters });
        const screen = render(<SearchFilter name={key} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        expect(input).toHaveValue(value);
        userEvent.type(input, "test");
        await act(async () => {
            await waitFor(() => expect(mockedSetFilters).toHaveBeenCalledWith({ [key]: value + "test" }));
        });
    });
});
