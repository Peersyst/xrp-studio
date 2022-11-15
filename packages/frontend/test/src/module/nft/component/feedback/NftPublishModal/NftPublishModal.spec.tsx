import {
    CollectionDtoMock,
    CreateNftDraftRequestMock,
    CreateNftMetadataRequestMock,
    NftDtoMock,
    ToastMock,
    UseCheckBalanceMock,
    WalletMock,
} from "test-mocks";
import { render, translate } from "test-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { NftService } from "module/api/service";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("NftPublishModal tests", () => {
    const createNftDraftRequestMock = new CreateNftDraftRequestMock({
        issuer: "issuer",
        transferFee: 3,
        flags: { burnable: true, onlyXRP: true, trustLine: true, transferable: true },
        taxon: 1,
        metadata: new CreateNftMetadataRequestMock({ name: "nft_name", image: "image" }),
    });
    const COLLECTIONS_NFT = [new CollectionDtoMock()];

    const useToastMock = new ToastMock();

    beforeAll(() => {
        useToastMock.clear();
    });

    test("Renders correctly", () => {
        render(<NftPublishModal requestNft={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);

        expect(screen.getByRole("heading", { name: translate("publishConfirmation") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: capitalize(translate("confirm")) })).toBeInTheDocument();
        /* NftInformation */
        expect(screen.queryByText("nft_name")).toBeInTheDocument();
        expect(screen.queryByText("issuer")).toBeInTheDocument();
        expect(screen.queryByText("collection_name")).toBeInTheDocument();
        expect(screen.queryByText("3%")).toBeInTheDocument();
        expect(screen.queryByText(translate("burnable"))).toBeInTheDocument();
        expect(screen.queryByText(translate("onlyXRP"))).toBeInTheDocument();
        expect(screen.queryByText(translate("trustLine"))).toBeInTheDocument();
        expect(screen.queryByText(translate("transferable"))).toBeInTheDocument();
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
            const createNftMock = jest.spyOn(NftService, "nftControllerCreateNft").mockResolvedValueOnce(new NftDtoMock());
            render(<NftPublishModal requestNft={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);
            const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
            await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
            userEvent.click(confirmPublishButton);

            await waitFor(() => expect(createNftMock).toHaveBeenCalledWith(createNftDraftRequestMock));
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
            render(<NftPublishModal requestNft={createNftDraftRequestMock} collections={COLLECTIONS_NFT} />);

            const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
            await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
            userEvent.click(confirmPublishButton);

            await waitFor(() =>
                expect(useToastMock.showToast).toHaveBeenCalledWith(translate("notEnoughBalance", { ns: "error" }), { type: "error" }),
            );
        });
    });
});
