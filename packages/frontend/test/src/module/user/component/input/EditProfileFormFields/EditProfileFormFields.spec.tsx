import EditProfileFormFields from "module/user/component/input/EditProfileFormFields/EditProfileFormFields";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
import { UserService } from "module/api/service";
import * as UseWallet from "module/wallet/component/hooks/useWallet";

describe("EditProfileFormFields", () => {
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });
    test("Render all values", () => {
        const userDtoMock = new UserDtoMock({ name: "", description: "", twitter: "", discord: "" });
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        const screen = render(<EditProfileFormFields />);
        //name
        expect(screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }))).toBeInTheDocument();
        //bio
        expect(screen.getByPlaceholderText(translate("writeYour", { name: translate("bio") }))).toBeInTheDocument();
        //discord
        expect(screen.getByPlaceholderText(translate("writeYour", { name: "Discord @id" }))).toBeInTheDocument();
        //twitter
        expect(screen.getByPlaceholderText(translate("writeYour", { name: "Twitter @id" }))).toBeInTheDocument();
        //Update button
        expect(screen.getByRole("button", { name: translate("updateProfile") })).toBeInTheDocument();
    });
});
