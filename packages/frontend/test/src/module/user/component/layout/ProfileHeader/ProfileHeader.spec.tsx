import { UserDtoMock } from "test-mocks";
import { UserService } from "module/api/service";
import * as Router from "react-router-dom";
import { screen } from "@testing-library/react";
import ProfileHeader from "module/user/component/layout/ProfileHeader/ProfileHeader";
import { render } from "test-utils";
import { waitFor } from "@testing-library/dom";

describe("ProfileHeader", () => {
    const userDtoMock = new UserDtoMock();

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
    });

    test("Renders correctly", async () => {
        render(<ProfileHeader />);
        // Header and StickyHeader
        await waitFor(() => expect(screen.getAllByRole("heading", { name: userDtoMock.name })).toHaveLength(2));
        const images = screen.getAllByRole("img");
        expect(images.some((image) => image.getAttribute("alt") === "profile-image")).toBe(true);
        expect(images.some((image) => image.getAttribute("alt") === "profile-header")).toBe(true);
    });
});
