import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock, ToastMock, UseCheckBalanceMock, WalletMock } from "test-mocks";
import { render, translate } from "test-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
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

    let useCheckBalanceMock: UseCheckBalanceMock;
    let walletMock: WalletMock;

    const useToastMock = new ToastMock();

    beforeAll(() => {
        useToastMock.clear();
    });

    beforeEach(() => {
        useCheckBalanceMock = new UseCheckBalanceMock();
        walletMock = new WalletMock({ isLogged: true, active: true, address: "0x" });
    });

    afterEach(() => {
        useCheckBalanceMock.restore();
        walletMock.restore();
    });

    test("Swaps tabs creating NFT", async () => {
        render(<NftPublishModal request={createNftDraftRequestMock} collection={COLLECTIONS_NFT} />);

        const confirmPublishButton = screen.getByRole("button", { name: capitalize(translate("confirm")) });
        await waitFor(() => expect(confirmPublishButton).not.toBeDisabled());
        userEvent.click(confirmPublishButton);

        await act(() =>
            waitFor(() => {
                const viewDetailsButton = screen.getByText(translate("viewDetails"));
                expect(viewDetailsButton).toBeInTheDocument();
                waitFor(() => expect(screen.queryByText(translate("viewDetails"))).not.toBeDisabled());
                userEvent.click(viewDetailsButton);
            }),
        );
    });
});
