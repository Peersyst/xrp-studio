import Filters from "module/common/component/input/Filters/Filters";
import { BaseFiltersNames } from "module/common/component/input/Filters/FiltersContext";
import { UseFilterContextMock } from "test-mocks";
import { render, translate } from "test-utils";

describe("Test for the Filters", () => {
    test("Renders correctly", () => {
        new UseFilterContextMock({ filters: { [BaseFiltersNames.ORDER]: "DESC" }, setFilters: jest.fn() });
        const screen = render(
            <Filters>
                {{
                    header: <p>header</p>,
                    content: <p>body</p>,
                }}
            </Filters>,
        );
        expect(screen.getByText("header")).toBeInTheDocument();
        expect(screen.getByText("body")).toBeInTheDocument();
        //Search filter
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(input).toHaveValue("");
        //Order by filter
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
        expect(screen.getAllByText(translate("Latest"))).toHaveLength(2);
        expect(screen.getByText(translate("Oldest"))).toBeInTheDocument();
    });
});
