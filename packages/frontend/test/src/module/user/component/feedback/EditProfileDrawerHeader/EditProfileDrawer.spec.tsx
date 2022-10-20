import { DrawerMock, ToastMock, UserDtoMock, WalletMock } from "test-mocks";
import { act, fireEvent, render, translate, waitFor } from "test-utils";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { UserService } from "module/api/service";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";
import * as useUpdateUser from "module/user/query/useUpdateUser";
import createUserRequestFromUserDTO from "module/user/util/createUserRequestFromUserDTO";
import userEvent from "@testing-library/user-event";
import * as uploadFile from "module/api/service/helper/uploadFile";

describe("EditProfileDrawer", () => {
    const wallet = new WalletMock({ address: "0x123" });
    const userDtoMock = new UserDtoMock({ name: "", description: "", twitter: "", discord: "" });
    const newUserDtoMock = new UserDtoMock({
        name: "Manolito Gafotas",
        description: "newDescription",
        twitter: "newTwitter",
        discord: "newDiscord",
        header: "new_img_url",
        image: "new_img_url",
    });

    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValue({ exist: false });
    });

    test("Renders correctly + updates profile", async () => {
        const mockedUseUpdateUser = jest.fn();
        const mockedUpload = jest.fn().mockResolvedValue("new_img_url");
        const mockedCloseDrawer = jest.fn();
        const mockedShowToast = jest.fn();
        new ToastMock({ showToast: mockedShowToast });
        new DrawerMock({ hideDrawer: mockedCloseDrawer });
        jest.spyOn(uploadFile, "uploadFile").mockImplementation(mockedUpload);
        jest.spyOn(useUpdateUser, "useUpdateUser").mockReturnValue({ mutateAsync: mockedUseUpdateUser } as any);

        const screen = render(<EditProfileDrawer />);

        //title
        expect(screen.getByRole("heading", { name: translate("editProfile") })).toBeInTheDocument();
        /**
         * IMAGES
         */
        //Wait until the images are loaded
        await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(6));
        //Cover
        const coverImg = screen.getAllByRole("img")[0];
        expect(coverImg).toHaveAttribute("alt", "header-image");
        //Upload a new cover image
        const newCover = new File(["hello"], "cover.png", { type: "image/png" });
        const coverInput = coverImg.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(coverInput!, newCover);
        // Act has to be used as state is updated after uploading a file
        await act(async () => {
            await waitFor(() => expect(mockedUpload).toHaveBeenCalledWith(newCover, "image"));
        });
        //Avatar
        const newAvatar = new File(["hello"], "newAvatar.png", { type: "image/png" });
        const avatarImg = screen.getAllByRole("img")[3];
        expect(avatarImg).toHaveAttribute("alt", "edit-profile-image");
        const uploadAvatarBtn = screen.getAllByRole("button", { name: translate("change") })[1];
        const avatarInput = uploadAvatarBtn.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(avatarInput!, newAvatar);
        // Act has to be used as state is updated after uploading a file
        await act(async () => {
            await waitFor(() => expect(mockedUpload).toHaveBeenCalledWith(newAvatar, "image"));
        });
        /**
         * TEXT FIELDS
         */
        //name
        const nameInput = screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }));
        //Update with a name that doesn't exist
        fireEvent.change(nameInput, { target: { value: newUserDtoMock.name } });
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: false });
        //Name updated
        await waitFor(() => expect(screen.queryByText(translate("userAlreadyExists", { ns: "error" }))).not.toBeInTheDocument());
        //Not Loading
        await waitFor(() => expect(screen.queryAllByTestId("LoaderIcon")).toHaveLength(2)); //2 bc of the avatar and cover
        //Name updated
        await waitFor(() => expect(screen.queryByText(translate("userAlreadyExists", { ns: "error" }))).not.toBeInTheDocument());
        const bioInput = screen.getByPlaceholderText(translate("writeYour", { name: translate("bio") }));
        expect(bioInput).toBeInTheDocument();
        userEvent.type(bioInput, newUserDtoMock.description!);
        await waitFor(() => expect(bioInput).toHaveValue(newUserDtoMock.description!));
        //discord
        const discordInput = screen.getByPlaceholderText(translate("writeYour", { name: "Discord @id" }));
        expect(discordInput).toBeInTheDocument();
        userEvent.type(discordInput, newUserDtoMock.discord!);
        await waitFor(() => expect(discordInput).toHaveValue(newUserDtoMock.discord!));
        //twitter
        const twitterInput = screen.getByPlaceholderText(translate("writeYour", { name: "Twitter @id" }));
        expect(twitterInput).toBeInTheDocument();
        userEvent.type(twitterInput, newUserDtoMock.twitter!);
        await waitFor(() => expect(twitterInput).toHaveValue(newUserDtoMock.twitter!));
        //Update button
        const updateBtn = screen.getByRole("button", { name: translate("updateProfile") });
        expect(updateBtn).toBeInTheDocument();
        fireEvent.click(updateBtn);
        await waitFor(() => expect(mockedUseUpdateUser).toHaveBeenCalledWith(createUserRequestFromUserDTO(newUserDtoMock)));
        await waitFor(() => expect(mockedCloseDrawer).toHaveBeenCalledWith(EditProfileDrawer.id));
        expect(mockedShowToast).toHaveBeenCalledWith(translate("profileUpdated", { ns: "success" }), { type: "success" });
    });
});
