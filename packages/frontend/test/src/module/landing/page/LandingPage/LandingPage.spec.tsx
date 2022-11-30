import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import LandingPage from "module/landing/page/LandingPage/LandingPage";

describe("LandingPage", () => {
    test("Renders correctly", async () => {
        render(<LandingPage />);

        // Header
        expect(screen.getByText(translate("createAndManageNft")));
        expect(screen.getByText(translate("landingHeaderDescription")));
    });
});
