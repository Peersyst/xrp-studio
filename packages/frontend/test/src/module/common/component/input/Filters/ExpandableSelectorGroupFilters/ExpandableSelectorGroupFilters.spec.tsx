import { fireEvent } from "@testing-library/react";
import ExpandableSelectorGroupFilter from "module/common/component/input/Filters/ExpandableSelectorGroupFilter/ExpandableSelectorGroupFilter";
import { SelectorOption } from "@peersyst/react-components-core";
import { render } from "test-utils";
import { UseFilterMock } from "test-mocks";

describe("ExpandableSelectorGroupFilter component", () => {
    test("Renders correctly", () => {
        const name = "selector";
        const options: SelectorOption<string>[] = [
            {
                label: "label1",
                value: "1",
            },
            {
                label: "label2",
                value: "2",
            },
        ];

        const { setFilter } = new UseFilterMock({ filter: "1" });
        const screen = render(<ExpandableSelectorGroupFilter title="title" name={name} options={options} />);
        expect(screen.getByText("title")).toBeInTheDocument();
        //Have length 2 because it is the default value of the queryFilter
        expect(screen.getAllByText("label1")).toHaveLength(2);
        expect(screen.getByText("label2"));
        const radioBtn = screen.getByTestId("RadioUncheckedIcon");
        expect(radioBtn).toBeInTheDocument();
        fireEvent.click(radioBtn);
        expect(setFilter).toHaveBeenCalledWith("2");
    });
    test("With multiple elements selected", () => {
        const name = "selector";
        const options: SelectorOption<string>[] = [
            {
                label: "Label1",
                value: "1",
            },
            {
                label: "Label2",
                value: "2",
            },
        ];

        const { setFilter } = new UseFilterMock<string, true>({ filter: ["1", "2"] });
        const screen = render(<ExpandableSelectorGroupFilter multiple title="title" name={name} options={options} />);
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("Label1")).toBeInTheDocument();
        expect(screen.getByText("Label2")).toBeInTheDocument();
        expect(screen.getByText("Label1, Label2")).toBeInTheDocument(); //default value coma separated
        const radioBtns = screen.getAllByTestId("RadioCheckedIcon");
        expect(radioBtns).toHaveLength(2);
        const radioBtn = radioBtns[0];
        expect(radioBtn).toBeInTheDocument();
        fireEvent.click(radioBtn);
        expect(setFilter).toHaveBeenCalledWith(["2"]);
    });
});
