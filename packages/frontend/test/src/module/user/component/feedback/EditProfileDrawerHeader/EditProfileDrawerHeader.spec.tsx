import { UserService } from "module/api/service";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
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
    test("renders correctly", () => {
        const screen = render(<EditProfileDrawerHeader />);
        expect(screen.getAllByRole("button", { name: translate("change") })).toHaveLength(2);
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(6);
    });
});
