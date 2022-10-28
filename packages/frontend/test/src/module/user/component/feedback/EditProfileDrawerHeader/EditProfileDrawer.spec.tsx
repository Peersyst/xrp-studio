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
    const userDtoMock = new UserDtoMock({ name: "", description: "", twitter: "", discord: "", header: undefined, image: undefined });
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
        //Cover
        //Upload a new cover image
        await waitFor(() => expect(screen.getByAltText("header-image")).toHaveAttribute("src", userDtoMock.header));
        const newCover = new File(["hello"], "cover.png", { type: "image/png" });
        const coverInput = screen.container.getElementsByTagName("input")[0];
        userEvent.upload(coverInput!, newCover);
        // Act has to be used as state is updated after uploading a file
        await act(async () => {
            await waitFor(() => expect(mockedUpload).toHaveBeenCalledWith(newCover, "image"));
        });
        //Avatar
        const newAvatar = new File(["hello"], "newAvatar.png", { type: "image/png" });
        const avatarInput = screen.container.getElementsByTagName("input")[1];
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
        await waitFor(() => expect(screen.getByTestId("SuccessIcon")).toBeInTheDocument());

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
