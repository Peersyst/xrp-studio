import { capitalize } from "@peersyst/react-utils";
import EditProfileName from "module/user/component/input/EditProfileName/EditProfileName";
import { UserDtoMock, WalletMock } from "test-mocks";
import { fireEvent, render, translate, waitFor } from "test-utils";
import * as UseWallet from "module/wallet/hook//useWallet";
import { UserService } from "module/api/service";

describe("EditProfileName", () => {
    const wallet = new WalletMock({ address: "0x123" });

    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });

    test("Renders correctly and validates correctly", async () => {
        const userDtoMock = new UserDtoMock({ name: "" });
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: true });
        const screen = render(<EditProfileName />);
        //Renders correctly
        expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
        expect(screen.getByText("@")).toBeInTheDocument();
        const input = screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }));
        expect(input).toBeInTheDocument();
        //Not showing any error when loading an account without name
        await waitFor(() => expect(screen.queryByText(translate("userAlreadyExists", { ns: "error" }))).not.toBeInTheDocument());
        //Update with a name that already exists
        fireEvent.change(input, { target: { value: "Manolo" } });
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: true });
        //Loading -> fetching the name
        expect(screen.getByTestId("LoaderIcon")).toBeInTheDocument();
        //Wait until the validation is done -> show error msg bc the name already exists
        await waitFor(() => expect(screen.getByText(translate("userAlreadyExists", { ns: "error" }))).toBeInTheDocument());
        expect(screen.queryByTestId("LoaderIcon")).not.toBeInTheDocument();
        //Update with a name that doesn't exist
        fireEvent.change(input, { target: { value: "Manolo Parra" } });
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: false });
        //Name updated
        await waitFor(() => expect(screen.queryByText(translate("userAlreadyExists", { ns: "error" }))).not.toBeInTheDocument());
        //Not Loading
        await waitFor(() => expect(screen.queryByTestId("LoaderIcon")).not.toBeInTheDocument());
    });

    test("Do not allow empty name", async () => {
        const userDtoMock = new UserDtoMock({ name: "Manolito" });
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        const screen = render(<EditProfileName />);
        const input = screen.getByPlaceholderText(translate("writeYour", { name: translate("name") }));
        //Update with a name that already exists
        fireEvent.change(input, { target: { value: "Manolo" } });
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: true });
        //Loading -> fetching the name
        expect(screen.getByTestId("LoaderIcon")).toBeInTheDocument();
        //Wait until the validation is done -> show error msg bc the name already exists
        await waitFor(() => expect(screen.getByText(translate("userAlreadyExists", { ns: "error" }))).toBeInTheDocument());
        //Update with an empty name
        fireEvent.change(input, { target: { value: "" } });
        jest.spyOn(UserService, "userControllerCheckUserName").mockResolvedValueOnce({ exist: false });
        //Show empty name error
        await waitFor(() => expect(screen.getByText(translate("nameCanNotBeEmpty", { ns: "error" }))).toBeInTheDocument());
    });
});
