import { UserService } from "module/api/service";
import { UserDtoMock } from "test-mocks";
import { render, screen } from "test-utils";
import ProfileInfo from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo";
import { waitFor } from "@testing-library/dom";
import * as Hooks from "@peersyst/react-hooks";
import * as Router from "react-router-dom";
import { formatHash } from "@peersyst/react-utils";

describe("ProfileInfo", () => {
    const userDtoMock = new UserDtoMock();

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
    });

    test("Renders correctly", async () => {
        render(<ProfileInfo />);
        await waitFor(() => expect(screen.getByRole("heading", { name: userDtoMock.name })).toBeInTheDocument());
        expect(screen.getByText(formatHash(userDtoMock.address, undefined, 12))).toBeInTheDocument();
        expect(screen.getByText(userDtoMock.description!)).toBeInTheDocument();
    });

    test("Renders correctly on sm", async () => {
        jest.spyOn(Hooks, "useMediaQuery").mockReturnValue(true);
        render(<ProfileInfo />);
        await waitFor(() => expect(screen.getByRole("heading", { name: userDtoMock.name })).toBeInTheDocument());
        expect(screen.getByText(formatHash(userDtoMock.address, undefined, 12))).toBeInTheDocument();
        expect(screen.getByText(userDtoMock.description!)).toBeInTheDocument();
    });
});
