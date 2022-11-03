import { UserService } from "module/api/service";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import EditProfileDrawerHeader from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawerHeader/EditProfileDrawerHeader";

describe("EditProfileDrawerHeader", () => {
    const userDtoMock = new UserDtoMock();
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });
    test("renders correctly", async () => {
        const screen = render(<EditProfileDrawerHeader />);
        //Wait until the image is loaded
        await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(4));
    });
});
