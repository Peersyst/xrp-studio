import { UserService } from "module/api/service";
import EditProfileCover from "module/user/component/input/EditProfileCover/EditProfileCover";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/component/hooks/useWallet";

describe("EditProfileCover", () => {
    const userDtoMock = new UserDtoMock();
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });

    test("Renders correctly", async () => {
        const screen = render(<EditProfileCover />);
        //Wait until the image is loaded
        await waitFor(() => expect(screen.getByAltText("header-image")).toHaveAttribute("src", userDtoMock.header));
    });
});
