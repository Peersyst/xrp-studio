import BaseGridFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters";
import { render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-hooks";
import * as Recoil from "recoil";

describe("BaseGridFilters test", () => {
    test("Renders correctly", () => {
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(false);
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);
        const screen = render(<BaseGridFilters>{{ content: <div>test</div> }}</BaseGridFilters>);
        expect(screen.getByText("test")).toBeInTheDocument();
        //Filters
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
    });
});
