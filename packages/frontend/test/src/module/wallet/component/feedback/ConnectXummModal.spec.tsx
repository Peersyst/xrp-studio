import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { fireEvent, render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-components";
import { ModalMock } from "test-mocks";
import * as useConnectToXumm from "module/wallet/component/hooks/useConnectToXumm/useConnectToXumm";

describe("Test for the connect Xumm Modal", () => {
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
        expect(getByRole("heading", { name: subtitle })).toBeInTheDocument();
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
        const hideModal = jest.fn();
        const useModalMock = new ModalMock({ hideModal });
        jest.spyOn(PeersystLib, "useModal").mockReturnValue(useModalMock);
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
        expect(hideModal).toHaveBeenCalledWith(ConnectXummModal.id);
    });
});
