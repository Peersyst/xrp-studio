import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { fireEvent, render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-components";
import { ModalMock } from "test-mocks";

describe("Test for the connect Xumm Modal", () => {
    test("Renders correctly", () => {
        const title = translate("scanXummQR");
        const subtitle = translate("scanXummQRExplanation");
        const xummLabel = translate("getXummCTA");
        const { getByRole } = render(<ConnectXummModal />);
        expect(getByRole("heading", { name: title })).toBeInTheDocument();
        expect(getByRole("heading", { name: subtitle })).toBeInTheDocument();
        expect(getByRole("heading", { name: xummLabel })).toBeInTheDocument();
        expect(getByRole("button", { name: translate("dismiss") })).toBeInTheDocument();
        expect(getByRole("img", { name: "xumm-login" })).toBeInTheDocument();
        expect(getByRole("img", { name: "app-store-logo" })).toBeInTheDocument();
        expect(getByRole("img", { name: "play-store-logo" })).toBeInTheDocument();
    });
    test("Hides modal correctly", () => {
        //Mocks
        const hideModal = jest.fn();
        const useModalMock = new ModalMock({ hideModal });
        jest.spyOn(PeersystLib, "useModal").mockReturnValue(useModalMock);
        //Test
        const { getByRole } = render(<ConnectXummModal />);
        const dismissButton = getByRole("button", { name: translate("dismiss") });
        fireEvent.click(dismissButton);
        expect(hideModal).toHaveBeenCalledWith(ConnectXummModal.id);
    });
});
