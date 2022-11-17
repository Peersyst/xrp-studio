import { screen } from "@testing-library/react";
import { UserDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import DropLandingArtistSection from "module/drop/component/display/DropLanding/DropLandingArtistSection/DropLandingArtistSection";
import { UserRoutes } from "module/user/UserRouter";

describe("DropLandingArtistSection", () => {
    test("Renders correctly", () => {
        const userDtoMock = new UserDtoMock();

        render(<DropLandingArtistSection artist={userDtoMock} />);

        expect(screen.getByAltText("artist-image")).toHaveAttribute("src", userDtoMock.image);
        expect(screen.getByRole("link", { name: translate("meetTheArtist") })).toHaveAttribute(
            "href",
            UserRoutes.PROFILE.replace(":address", userDtoMock.address),
        );
        expect(screen.getByRole("heading", { name: userDtoMock.name })).toBeInTheDocument();
        expect(screen.getByText(userDtoMock.description!)).toBeInTheDocument();
    });
});
