import ExploreTabs from "module/explore/component/layout/ExploreTabs/ExploreTabs";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { ExploreRoutes } from "module/explore/ExploreRouter";

describe("ExploreTabs tests", () => {
    test("Renders correctly", () => {
        render(<ExploreTabs />, { router: { initialEntries: ["/explore"], path: ExploreRoutes.MAIN } });

        expect(screen.getByText(translate("trending"))).toBeInTheDocument();
        expect(screen.getByText(translate("collections"))).toBeInTheDocument();
        expect(screen.getByText(translate("nfts"))).toBeInTheDocument();
    });
});
