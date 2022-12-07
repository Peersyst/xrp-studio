import ProfileNftsGrid from "module/user/component/layout/ProfileNftsGrid/ProfileNftsGrid";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";
import { NftService } from "module/api/service";
import * as Router from "react-router-dom";

describe("Test for the ProfileNftsGrid", () => {
    beforeAll(() => {
        jest.spyOn(Router, "useParams").mockReturnValue({ address: "0x" });
    });

    test("Renders correctly with nfts", async () => {
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<ProfileNftsGrid />);
        /**
         * Content
         */
        await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
    });

    test("Renders correctly without nfts", async () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(Router, "useNavigate").mockReturnValue(mockedNavigate);
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 0 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<ProfileNftsGrid />);
        /**
         * Content
         */
        await waitFor(() => expect(screen.getByRole("heading", { name: translate("userNoNfts", { ns: "error" }) })).toBeInTheDocument());
    });
});
