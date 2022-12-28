import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import DropLandingSocialMediaSection from "module/drop/component/display/DropLanding/DropLandingSocialMediaSection/DropLandingSocialMediaSection";

describe("Drop Landing Social Media Section", () => {
    test("Renders correctly", () => {
        render(
            <DropLandingSocialMediaSection
                networks={{ instagram: undefined, discord: "http://example.com", twitter: "http://example.com" }}
                loading={false}
            />,
        );

        // Text
        expect(screen.getByText(translate("joinOurCommunity"))).toBeInTheDocument();
        // Social Network show test
        expect(screen.getByTestId("DiscordIcon")).toBeInTheDocument();
        expect(screen.getByTestId("TwitterIcon")).toBeInTheDocument();
        // Social Network not show test
        expect(screen.queryByTestId("IntagramIcon")).not.toBeInTheDocument();
    });
});
