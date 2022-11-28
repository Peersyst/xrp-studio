import ExplorePage from "module/explore/page/ExplorePage/ExplorePage";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import * as useRouteMatch from "module/common/hook/useRouteMatch";

describe("ExplorePage tests", () => {
    test("Renders tabs correctly", () => {
        const useRouteMatchMock = jest.spyOn(useRouteMatch, "default").mockImplementation(jest.fn());
        render(<ExplorePage />);

        expect(useRouteMatchMock).toHaveBeenCalled();
        expect(screen.getByRole("heading", { name: translate("explore") })).toBeInTheDocument();
        expect(screen.getByText(translate("trending"))).toBeInTheDocument();
        expect(screen.getByText(translate("collections"))).toBeInTheDocument();
        expect(screen.getByText(translate("nfts"))).toBeInTheDocument();

        expect(screen.getByText("This is Trending panel")).toBeInTheDocument();
    });
});
