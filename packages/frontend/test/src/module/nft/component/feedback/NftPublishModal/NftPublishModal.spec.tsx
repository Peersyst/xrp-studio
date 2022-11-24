import {
    CreateNftDraftRequestMock,
    CreateNftMetadataRequestMock,
    ToastMock,
    UseCheckBalanceMock,
    WalletMock,
    UsePublishNftMock,
} from "test-mocks";
import { render, translate } from "test-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("NftPublishModal tests", () => {
    const createNftDraftRequestMock = new CreateNftDraftRequestMock({
        issuer: "issuer",
        transferFee: 3,
        flags: { burnable: true, onlyXRP: true, trustLine: true, transferable: true },
        taxon: 1,
        metadata: new CreateNftMetadataRequestMock({ name: "nft_name", image: "image" }),
    });
    const COLLECTIONS_NFT = "collection_name";

    let useCheckBalanceMock: UseCheckBalanceMock;
    let walletMock: WalletMock;
    let usePublishNftMock: UsePublishNftMock;

    const useToastMock = new ToastMock();

    beforeAll(() => {
        useToastMock.clear();
    });

    beforeEach(() => {
        useCheckBalanceMock = new UseCheckBalanceMock();
        walletMock = new WalletMock({ isLogged: true, active: true, address: "0x" });
        usePublishNftMock = new UsePublishNftMock();
    });

    afterEach(() => {
        useCheckBalanceMock.restore();
        walletMock.restore();
        usePublishNftMock.restore();
    });

    test("Create published NFT", async () => {
        render(<NftPublishModal request={createNftDraftRequestMock} collection={COLLECTIONS_NFT} />);

        const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
        await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
        userEvent.click(confirmPublishButton);
        await act(() => waitFor(() => expect(usePublishNftMock.mock).toHaveBeenCalled()));
    });
});
