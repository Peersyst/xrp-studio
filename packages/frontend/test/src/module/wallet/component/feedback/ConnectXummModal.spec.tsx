import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { fireEvent, render, translate } from "test-utils";
import { ModalMock } from "test-mocks";

describe("ConnectXummModal", () => {
    test("Renders correctly", () => {
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
    test("Hides modal correctly", () => {
        //Mocks
        const useModalMock = new ModalMock();
        //Test
        const { getByRole } = render(<ConnectXummModal />);
        const dismissButton = getByRole("button", { name: translate("dismiss") });
        fireEvent.click(dismissButton);
        expect(useModalMock.hideModal).toHaveBeenCalledWith(ConnectXummModal.id);
    });
});
