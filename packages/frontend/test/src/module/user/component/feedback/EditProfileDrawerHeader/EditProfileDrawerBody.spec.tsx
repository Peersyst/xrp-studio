import EditProfileDrawerBody from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawerBody/EditProfileDrawerBody";
import { DrawerMock, UserDtoMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
import * as UseWallet from "module/wallet/hook//useWallet";
import { UserService } from "module/api/service";
import { fireEvent } from "@testing-library/dom";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";

describe("EditProfileDrawerBody", () => {
    const wallet = new WalletMock({ address: "0x123" });
    const userDtoMock = new UserDtoMock({ name: "", description: "", twitter: "", discord: "" });

    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
    });

    test("Renders correctly & closes modals", () => {
        const mockedCloseDrawer = jest.fn();
        new DrawerMock({ hideDrawer: mockedCloseDrawer });
        const screen = render(<EditProfileDrawerBody />);
        //title
        expect(screen.getByRole("heading", { name: translate("editProfile") })).toBeInTheDocument();
        //form
        expect(screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }))).toBeInTheDocument();
        //Update button
        expect(screen.getByRole("button", { name: translate("updateProfile") })).toBeInTheDocument();
        //Cancel button
        const cancelBtn = screen.getByRole("button", { name: translate("cancel") });
        expect(cancelBtn).toBeInTheDocument();
        fireEvent.click(cancelBtn);
        expect(mockedCloseDrawer).toHaveBeenCalledWith(EditProfileDrawer.id);
    });
});
