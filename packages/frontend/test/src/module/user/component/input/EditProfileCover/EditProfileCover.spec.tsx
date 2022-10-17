import { UserService } from "module/api/service";
import EditProfileCover from "module/user/component/input/EditProfileCover/EditProfileCover";
import { UserDtoMock, WalletMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import userEvent from "@testing-library/user-event";
import * as uploadFile from "module/api/service/helper/uploadFile";
import * as Genesys from "@peersyst/react-components";

describe("Test for the editProfileCover component", () => {
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
        const screen = render(<EditProfileCover />);
        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        const image = new File(["hello"], "test.png", { type: "image/png" });
        //Wait until the image is loaded
        await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(3));
        const imgs = screen.getAllByRole("img");
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "cover-img");
        const input = img.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        //Wait until the image is uploaded
        await waitFor(() => expect(mockedUseFormNotification).toHaveBeenCalledWith("header", imgUrl));
    });
});
