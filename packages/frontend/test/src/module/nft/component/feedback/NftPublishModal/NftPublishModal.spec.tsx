import {
    CreateNftDraftRequestMock,
    CreateNftMetadataRequestMock,
    NftDtoMock,
    ToastMock,
    UseCheckBalanceMock,
    UseNftStatePollingMock,
    WalletMock,
} from "test-mocks";
import { render, translate } from "test-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { NftService } from "module/api/service";

describe("NftPublishModal tests", () => {
    const nftDtoMock = new NftDtoMock();
    const createNftDraftRequestMock = new CreateNftDraftRequestMock({
        issuer: "issuer",
        transferFee: 3,
        flags: { burnable: true, onlyXRP: true, trustLine: true, transferable: true },
        taxon: 1,
        metadata: new CreateNftMetadataRequestMock({ name: "nft_name", image: "image" }),
    });
    const COLLECTION_NAME = "collection_name";

    let useCheckBalanceMock: UseCheckBalanceMock;
    let createNftMock: jest.SpyInstance;
    let useNftStatePolling: UseNftStatePollingMock;
    let walletMock: WalletMock;

    const useToastMock = new ToastMock();

    beforeAll(() => {
        useToastMock.clear();
    });

    beforeEach(() => {
        useCheckBalanceMock = new UseCheckBalanceMock();
        createNftMock = jest.spyOn(NftService, "nftControllerCreateNft").mockResolvedValue(nftDtoMock);
        useNftStatePolling = new UseNftStatePollingMock();
        walletMock = new WalletMock({ isLogged: true, active: true, address: "0x" });
    });

    afterAll(() => {
        useCheckBalanceMock.restore();
        createNftMock.mockRestore();
        useNftStatePolling.restore();
        walletMock.restore();
    });

    test("Renders correctly", async () => {
        render(<NftPublishModal request={createNftDraftRequestMock} collection={COLLECTION_NAME} />);

        const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
        userEvent.click(confirmPublishButton);

        const viewDetailsButton = screen.getByText(translate("viewDetails"));
        await act(() => waitFor(() => expect(viewDetailsButton).not.toBeDisabled()));

        expect(screen.getByText(translate("publishNftSuccessStepTitle"))).toBeInTheDocument();
    });
});
