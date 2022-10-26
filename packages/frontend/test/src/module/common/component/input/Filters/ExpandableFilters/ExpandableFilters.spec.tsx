import ExpandableFilters from "module/common/component/input/Filters/ExpandableFilters/ExpandableFilters";
import { render } from "test-utils";

describe("Test for the ExpandableFilters", () => {
    test("Renders correctly", () => {
        const screen = render(
            <ExpandableFilters currentValue={"currentValue"} title="title">
                <p>test</p>
            </ExpandableFilters>,
        );
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("currentValue")).toBeInTheDocument();
        expect(screen.getByText("title")).toBeInTheDocument();
    });
    test("Renders correctly when loading", () => {
        const screen = render(
            <ExpandableFilters currentValue={"currentValue"} title="title" loading loadingText="loading">
                <p>test</p>
            </ExpandableFilters>,
        );
        expect(screen.getByText("loading")).toBeInTheDocument();
        expect(screen.getByText("title")).toBeInTheDocument();
    });
});
