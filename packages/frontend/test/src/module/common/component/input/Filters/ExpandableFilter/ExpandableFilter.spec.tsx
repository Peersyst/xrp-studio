import ExpandableFilter from "module/common/component/input/Filters/ExpandableFilter/ExpandableFilter";
import { render } from "test-utils";

describe("Test for the ExpandableFilter", () => {
    test("Renders correctly", () => {
        const screen = render(
            <ExpandableFilter currentValue={"currentValue"} title="title">
                <p>test</p>
            </ExpandableFilter>,
        );
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("currentValue")).toBeInTheDocument();
        expect(screen.getByText("title")).toBeInTheDocument();
    });
    test("Renders correctly when loading", () => {
        const screen = render(
            <ExpandableFilter currentValue={"currentValue"} title="title" loading loadingText="loading">
                <p>test</p>
            </ExpandableFilter>,
        );
        expect(screen.getByText("loading")).toBeInTheDocument();
    });
});
