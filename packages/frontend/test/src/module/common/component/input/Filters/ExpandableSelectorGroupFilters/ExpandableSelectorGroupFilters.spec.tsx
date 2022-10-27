import { fireEvent } from "@testing-library/react";
import ExpandableSelectorGroupFilters from "module/common/component/input/Filters/ExpandableSelectorGroupFilters/ExpandableSelectorGroupFilters";
import { SelectorOption } from "@peersyst/react-components-core";
import { UseFilterMock } from "test-mocks";
import { render } from "test-utils";

describe("ExpandableSelectorGroupFilters component", () => {
    test("Renders correctly", () => {
        const name = "selector";
        const options: SelectorOption<number>[] = [
            {
                label: "label1",
                value: 1,
            },
            {
                label: "label2",
                value: 2,
            },
        ];
        const queryFilter = { [name]: 1 };
        const mockedSetFilters = jest.fn();
        new UseFilterMock({ filters: queryFilter, setFilters: mockedSetFilters });
        const screen = render(<ExpandableSelectorGroupFilters title="title" name={name} options={options} />);
        expect(screen.getByText("title")).toBeInTheDocument();
        //Have length 2 because it is the default value of the queryFilter
        expect(screen.getAllByText("label1")).toHaveLength(2);
        expect(screen.getByText("label2"));
        const radioBtn = screen.getByTestId("RadioUncheckedIcon");
        expect(radioBtn).toBeInTheDocument();
        fireEvent.click(radioBtn);
        expect(mockedSetFilters).toHaveBeenCalledWith({ [name]: 2 });
    });
    test("With multiple elements selected", () => {
        const name = "selector";
        const options: SelectorOption<number>[] = [
            {
                label: "Label1",
                value: 1,
            },
            {
                label: "Label2",
                value: 2,
            },
        ];
        const queryFilter = { [name]: [1, 2] };
        const mockedSetFilters = jest.fn();
        new UseFilterMock({ filters: queryFilter, setFilters: mockedSetFilters });
        const screen = render(<ExpandableSelectorGroupFilters multiple title="title" name={name} options={options} />);
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("Label1")).toBeInTheDocument();
        expect(screen.getByText("Label2")).toBeInTheDocument();
        expect(screen.getByText("Label1, Label2")).toBeInTheDocument(); //default value coma separated
        const radioBtns = screen.getAllByTestId("RadioCheckedIcon");
        expect(radioBtns).toHaveLength(2);
        const radioBtn = radioBtns[0];
        expect(radioBtn).toBeInTheDocument();
        fireEvent.click(radioBtn);
        expect(mockedSetFilters).toHaveBeenCalledWith({ [name]: [2] });
    });
});
