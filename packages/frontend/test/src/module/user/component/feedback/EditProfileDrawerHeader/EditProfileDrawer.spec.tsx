import { UserDtoMock, WalletMock } from "test-mocks";
import { fireEvent, render, translate, waitFor } from "test-utils";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { UserService } from "module/api/service";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";
import * as useUpdateUser from "module/user/query/useUpdateUser";
import { getUserRequestFromUserDTO } from "module/user/util/getUserRequestFromUserDTO";

describe("Renders correclty", () => {
    const wallet = new WalletMock({ address: "0x123" });
    const userDtoMock = new UserDtoMock({ name: "", description: "", twitter: "", discord: "" });
    const newUserDtoMock = new UserDtoMock({
        name: "newName",
        description: "newDescription",
        twitter: "newTwitter",
        discord: "newDiscord",
    });
    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: false });
    });
    test("Renders correctly + updates profile", async () => {
        const mockedUseUpdateUser = jest.fn();
        jest.spyOn(useUpdateUser, "useUpdateUser").mockReturnValue({ mutateAsync: mockedUseUpdateUser } as any);
        const screen = render(<EditProfileDrawer />);
        //title
        expect(screen.getByRole("heading", { name: translate("editProfile") })).toBeInTheDocument();
        //Text fields
        //name
        const nameInput = screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }));
        expect(nameInput).toBeInTheDocument();
        fireEvent.change(nameInput, { target: { value: newUserDtoMock.name } });
        //bio
        expect(screen.getByPlaceholderText(translate("writeYour", { name: translate("bio") }))).toBeInTheDocument();
        //discord
        expect(screen.getByPlaceholderText(translate("writeYour", { name: "Discord @id" }))).toBeInTheDocument();
        //twitter
        expect(screen.getByPlaceholderText(translate("writeYour", { name: "Twitter @id" }))).toBeInTheDocument();
        //Update button
        const updateBtn = screen.getByRole("button", { name: translate("updateProfile") });
        expect(updateBtn).toBeInTheDocument();
        fireEvent.click(updateBtn);
        await waitFor(() =>
            expect(mockedUseUpdateUser).toHaveBeenCalledWith(
                getUserRequestFromUserDTO({
                    ...userDtoMock,
                    ...newUserDtoMock,
                }),
            ),
        );
        //Cancel button
        expect(screen.getByRole("button", { name: translate("cancel") })).toBeInTheDocument();
    });
});
