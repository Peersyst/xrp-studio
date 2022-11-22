import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock, ToastMock, UseCheckBalanceMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";
import * as Recoil from "recoil";
import userEvent from "@testing-library/user-event";

describe("NftPublishModal tests", () => {
    const createNftDraftRequestMock = new CreateNftDraftRequestMock({
        issuer: "issuer",
        transferFee: 3,
        flags: { burnable: true, onlyXRP: true, trustLine: true, transferable: true },
        taxon: 1,
        metadata: new CreateNftMetadataRequestMock({ name: "nft_name", image: "image" }),
    });
    const COLLECTIONS_NFT = "collection_name";

    const useToastMock = new ToastMock();

    beforeAll(() => {
        useToastMock.clear();
    });

    describe("NftPublishModal with balance", () => {
        let useCheckBalanceMock: UseCheckBalanceMock;
        let walletMock: WalletMock;

        beforeEach(() => {
            useCheckBalanceMock = new UseCheckBalanceMock();
            walletMock = new WalletMock({ isLogged: true, active: true, address: "0x" });
        });

        afterEach(() => {
            useCheckBalanceMock.restore();
            walletMock.restore();
        });

        test("Create published NFT with balance", async () => {
            const usePublishNftState = jest
                .spyOn(Recoil, "useRecoilValue")
                .mockReturnValue({ data: createNftDraftRequestMock, collection: COLLECTIONS_NFT });
            render(<NftPublishModal />);

            expect(usePublishNftState).toHaveBeenCalled();
            const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
            await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
            userEvent.click(confirmPublishButton);
            await waitFor(() => expect(useCheckBalanceMock.checkBalance).toHaveBeenCalled());
        });
    });

    describe("NftPublishModal without balance", () => {
        let useCheckBalanceMock: UseCheckBalanceMock;
        let walletMock: WalletMock;

        beforeEach(() => {
            useCheckBalanceMock = new UseCheckBalanceMock(false);
            walletMock = new WalletMock({ isLogged: true, active: true, address: "0x" });
        });

        afterEach(() => {
            useCheckBalanceMock.restore();
            walletMock.restore();
        });

        test("Create published NFT without balance", async () => {
            const usePublishNftState = jest
                .spyOn(Recoil, "useRecoilValue")
                .mockReturnValue({ data: createNftDraftRequestMock, collection: COLLECTIONS_NFT });

            render(<NftPublishModal />);

            expect(usePublishNftState).toHaveBeenCalled();
            const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
            await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
            userEvent.click(confirmPublishButton);
            await waitFor(() => expect(useCheckBalanceMock.checkBalance).toHaveBeenCalled());
            await waitFor(() =>
                expect(useToastMock.showToast).toHaveBeenCalledWith(translate("notEnoughBalance", { ns: "error" }), { type: "error" }),
            );
        });
    });
});