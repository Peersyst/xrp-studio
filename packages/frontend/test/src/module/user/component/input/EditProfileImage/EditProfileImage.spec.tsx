import { UserService } from "module/api/service";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/hook//useWallet";
import EditProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

describe("Test for the EditProfileImage component", () => {
    const userDtoMock = new UserDtoMock();
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });

    test("Renders correctly an uploads image", async () => {
        const screen = render(<EditProfileImage />);
        //Wait until the image is loaded
        await waitFor(() => expect(screen.getByAltText("profile-image")).toHaveAttribute("src", userDtoMock.image));
    });
});
