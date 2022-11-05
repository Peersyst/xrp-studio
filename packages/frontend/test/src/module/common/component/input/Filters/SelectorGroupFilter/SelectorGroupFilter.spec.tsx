import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { fireEvent, render } from "test-utils";
import { SelectorOption } from "@peersyst/react-components-core";
import { UseFilterContextMock } from "test-mocks";

describe("SelectorGroupFilter", () => {
    test("Renders correctly without multiple", () => {
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
        new UseFilterContextMock({ filters: queryFilter, setFilters: mockedSetFilters });
        const screen = render(<SelectorGroupFilter name={name} options={options} />);
        expect(screen.getByText("label1"));
        expect(screen.getByText("label2"));
        const radioBtn = screen.getByTestId("RadioUncheckedIcon");
        expect(radioBtn).toBeInTheDocument();
        fireEvent.click(radioBtn);
        expect(mockedSetFilters).toHaveBeenCalledWith({ [name]: 2 });
    });
});
