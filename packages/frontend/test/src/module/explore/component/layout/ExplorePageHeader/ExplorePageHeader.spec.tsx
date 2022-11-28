import ExplorePageHeader from "module/explore/component/layout/ExplorePageHeader/ExplorePageHeader";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("ExplorePageHeader tests", () => {
    test("Renders properly", () => {
        render(<ExplorePageHeader />);

        expect(screen.getByRole("heading", { name: translate("explore") })).toBeInTheDocument();
        expect(screen.getByText(translate("trending"))).toBeInTheDocument();
        expect(screen.getByText(translate("collections"))).toBeInTheDocument();
        expect(screen.getByText(translate("nfts"))).toBeInTheDocument();
    });
});
