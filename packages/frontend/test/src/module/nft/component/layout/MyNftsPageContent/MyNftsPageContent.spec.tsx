import { NftService } from "module/api/service";
import MyNftsPageContent from "module/nft/component/layout/MyNftsPageContent/MyNftsPageContent";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock, WalletMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";

describe("Test for the MyNftsPage", () => {
    test("Renders correctly with nfts", async () => {
        const wallet = new WalletMock({ address: "0x" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<MyNftsPageContent />);
        //Grid
        await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
    });
    test("Renders correctly without nfts", async () => {
        const wallet = new WalletMock();
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<NftDtoMock[]>();
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<MyNftsPageContent />);
        await waitFor(() => expect(screen.getByRole("heading", { name: translate("youHaveNoNfts", { ns: "error" }) })).toBeInTheDocument());
    });
});
