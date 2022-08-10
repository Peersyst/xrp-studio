import ConnectXummButton from "module/wallet/component/input/ConnectXummButton/ConnectXummButton";
import { fireEvent, render, translate } from "test-utils";
import * as PeersystLib from "@peersyst/react-components";
import { ModalMock } from "test-mocks";
import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";

describe("ConnectXummButton", () => {
    test("should render", () => {
        const label = translate("loginWithXumm");
        const screen = render(<ConnectXummButton />);
        expect(screen.getByTestId("WalletIcon")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
    test("Opens modal correctly", () => {
        //Mocks
        const showModal = jest.fn();
        const useModalMock = new ModalMock({ showModal });
        jest.spyOn(PeersystLib, "useModal").mockReturnValue(useModalMock);
        //Test
        const label = translate("loginWithXumm");
        const screen = render(<ConnectXummButton />);
        const btn = screen.getByRole("button", { name: label });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(showModal).toHaveBeenCalledWith(ConnectXummModal);
    });
});
