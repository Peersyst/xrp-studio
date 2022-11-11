import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { fireEvent, render, translate } from "test-utils";
import { ModalMock } from "test-mocks";
import * as useConnectToXumm from "module/wallet/hook/useConnectToXumm/useConnectToXumm";

describe("ConnectXummModal", () => {
    test("Renders correctly", () => {
        //useConnectToXumm mock
        const mockedSignIn = jest.fn();
        jest.spyOn(useConnectToXumm, "default").mockReturnValue({
            showLoading: false,
            signIn: mockedSignIn,
            xummQrUrl: "",
        });
        const title = translate("scanXummQR");
        const subtitle = translate("scanXummQRExplanation");
        const xummLabel = translate("getXummCTA");
        const { getByRole, getByText } = render(<ConnectXummModal />);
        expect(getByRole("heading", { name: title })).toBeInTheDocument();
        expect(getByText(subtitle)).toBeInTheDocument();
        expect(getByText(xummLabel)).toBeInTheDocument();
        expect(getByRole("button", { name: translate("dismiss") })).toBeInTheDocument();
        expect(getByRole("img", { name: "xumm-login" })).toBeInTheDocument();
        expect(getByRole("img", { name: "app-store-logo" })).toBeInTheDocument();
        expect(getByRole("img", { name: "play-store-logo" })).toBeInTheDocument();
    });
    test("Calls signIn when mounting", () => {
        //useConnectToXumm mock
        const mockedSignIn = jest.fn();
        jest.spyOn(useConnectToXumm, "default").mockReturnValue({
            showLoading: false,
            signIn: mockedSignIn,
            xummQrUrl: "",
        });
        render(<ConnectXummModal />);
        expect(mockedSignIn).toHaveBeenCalled();
    });
    test("Hides modal correctly", () => {
        //Mocks
        //Lib
        const useModalMock = new ModalMock();
        //useConnectToXumm
        const mockedSignIn = jest.fn();
        jest.spyOn(useConnectToXumm, "default").mockReturnValue({
            showLoading: false,
            signIn: mockedSignIn,
            xummQrUrl: "",
        });
        //Test
        const { getByRole } = render(<ConnectXummModal />);
        const dismissButton = getByRole("button", { name: translate("dismiss") });
        fireEvent.click(dismissButton);
        expect(useModalMock.hideModal).toHaveBeenCalledWith(ConnectXummModal.id);
    });
});
