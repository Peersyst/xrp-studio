import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import LandingPage from "module/landing/page/LandingPage/LandingPage";

describe("LandingPage", () => {
    test("Renders correctly", async () => {
        render(<LandingPage />);

        // Header
        expect(screen.getByText(translate("createAndManageNft")));
        expect(screen.getByText(translate("landingHeaderDescription")));

        //Content
        expect(screen.getByText(translate("topDropsInXrpStudio")));
        expect(screen.getByText(translate("topArtistsThatUseXRPStudio")));
        expect(screen.getByText(translate("theNfts")));
        expect(screen.getByText(translate("howItWorks")));
        expect(screen.getByText(translate("ourPartners")));
    });
});
