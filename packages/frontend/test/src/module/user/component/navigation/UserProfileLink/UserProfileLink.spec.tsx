import { screen } from "@testing-library/react";
import UserProfileLink from "module/user/component/navigation/UserProfileLink/UserProfileLink";
import { UserDtoMock } from "test-mocks";
import { render } from "test-utils";
import { UserRoutes } from "module/user/UserRouter";

describe("UserProfileLink", () => {
    test("Renders correctly with a user with name", () => {
        const userMock = new UserDtoMock({ name: "name" });

        render(<UserProfileLink user={userMock} />);

        expect(screen.getByRole("link")).toHaveAttribute("href", `/user/${userMock.address}`);
        expect(screen.getByAltText(`${userMock.name}-image`)).toBeInTheDocument();
        expect(screen.getByText(userMock.name!)).toBeInTheDocument();
    });

    test("Renders correctly with a user without name", () => {
        const userMock = new UserDtoMock({ name: "" });

        render(<UserProfileLink user={userMock} />);

        expect(screen.getByRole("link")).toHaveAttribute("href", UserRoutes.PROFILE.replace(":address", userMock.address));
        expect(screen.getByAltText("user-image")).toBeInTheDocument();
        expect(screen.getByText(userMock.address)).toBeInTheDocument();
    });
});
