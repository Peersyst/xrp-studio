import ProfileContent from "module/user/component/layout/ProfileContent/ProfileContent";
import * as Router from "react-router-dom";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";
import { NftService } from "module/api/service";
describe("Test for the Profile Content", () => {
    beforeAll(() => {
        jest.spyOn(Router, "useParams").mockReturnValue({ address: "0x" });
    });
    test("Renders correctly", async () => {
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<ProfileContent />);
        /**
         * NftsGrid
         */
        await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
    });
    test("Renders correctly without ntfs", async () => {
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 0 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<ProfileContent />);
        /**
         * NftsGrid
         */
        await waitFor(() => expect(screen.getByRole("heading", { name: translate("nothingToShow", { ns: "error" }) })).toBeInTheDocument());
    });
});
