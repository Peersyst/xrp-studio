import BaseGridFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters";
import { render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-hooks";

describe("BaseGridFilters test", () => {
    test("Renders correctly on desktop", () => {
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(false);
        const screen = render(<BaseGridFilters>{{ content: <div>test</div> }}</BaseGridFilters>);
        expect(screen.getByText("test")).toBeInTheDocument();
        //Filters
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
    });

    test("Renders correctly on mobile + tablet -> renders a modal", () => {
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(true);
        const screen = render(<BaseGridFilters>{{ content: <div>test</div> }}</BaseGridFilters>);
        expect(screen.getByText("test")).toBeInTheDocument();
        //Filters
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
    });
});
