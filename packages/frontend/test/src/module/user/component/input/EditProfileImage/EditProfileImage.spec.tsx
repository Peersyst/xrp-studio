import { UserService } from "module/api/service";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import userEvent from "@testing-library/user-event";
import * as uploadFile from "module/api/service/helper/uploadFile";
import * as Genesys from "@peersyst/react-components";
import EditProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

describe("Test for the EditProfileImage component", () => {
    const userDtoMock = new UserDtoMock();
    const wallet = new WalletMock({ address: "0x123" });
    const imgUrl = "img_url";

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(imgUrl);
    });
    test("Renders correctly an uploads image", async () => {
        const mockedUseFormNotification = jest.fn();
        jest.spyOn(Genesys, "useFormNotification").mockImplementation(mockedUseFormNotification);
        const screen = render(<EditProfileImage />);
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const btn = screen.getByRole("button", { name: translate("change") });
        expect(btn).toBeInTheDocument();
        //Wait until the image is loaded
        await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(3));
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(3);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "edit-profile-image");
        const input = btn.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        //Wait until the image is uploaded
        await waitFor(() => expect(mockedUseFormNotification).toHaveBeenCalledWith("image", imgUrl));
    });
});
