import FiltersContainer from "module/common/component/layout/BaseGridWithFilters/FiltersContainer/FiltersContainer";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";

describe("Filters container", () => {
    test("Renders correctly", () => {
        const screen = render(
            <FiltersContainer>
                <>Filters</>
            </FiltersContainer>,
        );
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("Filters")).toBeInTheDocument();
    });

    test("Hides fitlers correctly", () => {
        const mockedSetShowFilters = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetShowFilters);
        const screen = render(
            <FiltersContainer>
                <>Filters</>
            </FiltersContainer>,
        );
        const btn = screen.getByText(translate("hideFilters&Search"));
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedSetShowFilters).toHaveBeenCalledWith(false);
    });
});
