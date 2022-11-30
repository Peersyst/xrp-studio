import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import LandingPageHeader from "module/landing/page/LandingPage/LandingPageHeader/LandingPageHeader";

describe("LandingPage Header", () => {
    test("Renders correctly", async () => {
        render(<LandingPageHeader />);

        // Header Text
        expect(screen.getByText(translate("createAndManageNft")));
        expect(screen.getByText(translate("landingHeaderDescription")));
        // Header Button
        expect(screen.getByRole("button", { name: translate("startCreatingNow") }));
        // Header Image Nebula
        const images = screen.getAllByRole("img");
        expect(images.some((image) => image.getAttribute("alt") === "nebula header")).toBe(true);
    });
});
