import BaseGridFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters";
import { render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-hooks";

describe("BaseGridFilters test", () => {
    test("Renders correctly on desktop", () => {
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(false);
        const screen = render(
            <BaseGridFilters>
                <div>test</div>
            </BaseGridFilters>,
        );
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
    });

    test("Renders correctly on mobile + tablet -> renders a modal", () => {
        jest.spyOn(PeersystLib, "useMediaQuery").mockReturnValue(true);
        const screen = render(
            <BaseGridFilters>
                <div>test</div>
            </BaseGridFilters>,
        );
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
    });
});
