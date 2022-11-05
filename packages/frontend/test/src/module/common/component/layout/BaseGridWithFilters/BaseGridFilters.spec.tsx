import BaseGridFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters";
import { render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-hooks";
import { UseFilterContextMock } from "test-mocks";

describe("BaseGridFilters test", () => {
    test("Renders correctly on desktop", () => {
        new UseFilterContextMock();
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(false);
        const screen = render(<BaseGridFilters>{{ content: <div>test</div> }}</BaseGridFilters>);
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        //Filters
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
    });

    test("Renders correctly on mobile + tablet -> renders a modal", () => {
        new UseFilterContextMock();
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(true);
        const screen = render(<BaseGridFilters>{{ content: <div>test</div> }}</BaseGridFilters>);
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        //Filters
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByText(translate("OrderBy"))).toBeInTheDocument();
    });
});
