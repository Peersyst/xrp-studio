import { UserService } from "module/api/service";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import userEvent from "@testing-library/user-event";
import * as useUpdateUserFile from "module/user/query/useUpdateUserFile";
import EditProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

describe("Test for the EditProfileImage component", () => {
    const userDtoMock = new UserDtoMock();
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });
    test("Renders correctly an uploads image", () => {
        const mockedHandleFileChange = jest.fn();
        jest.spyOn(useUpdateUserFile, "default").mockReturnValue({ updating: false, handleFileChange: mockedHandleFileChange });
        const screen = render(<EditProfileImage />);
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const btn = screen.getByRole("button", { name: translate("change") });
        expect(btn).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(3);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "edit-profile-image");
        const input = btn.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        expect(mockedHandleFileChange).toHaveBeenCalledWith(image, "image");
    });
});
