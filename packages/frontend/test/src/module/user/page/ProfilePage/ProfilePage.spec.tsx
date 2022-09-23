import ProfilePage from "module/user/page/ProfilePage";
import * as Router from "react-router-dom";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock, UserDtoMock } from "test-mocks";
import { render, waitFor } from "test-utils";
import { UserService, NftService } from "module/api/service";
describe("Test for the Profile Page", () => {
    const userDtoMock = new UserDtoMock();

    beforeAll(() => {
        jest.spyOn(UserService, "userControllerGetUser").mockResolvedValue(userDtoMock);
        jest.spyOn(Router, "useParams").mockReturnValue({ address: userDtoMock.address });
    });
    test("Renders correctly with nfts", async () => {
        const data = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(data);
        const screen = render(<ProfilePage />);
        /**
         * ProfileHeader
         */
        await waitFor(() => expect(screen.getAllByRole("heading", { name: userDtoMock.name })).toHaveLength(1));
        const images = screen.getAllByRole("img");
        expect(images.some((image) => image.getAttribute("alt") === "profile-image")).toBe(true);
        expect(images.some((image) => image.getAttribute("alt") === "profile-header")).toBe(true);
        /**
         * ProfileContent
         */
        await waitFor(() => expect(screen.getAllByRole("heading", { name: data.items[0].metadata?.name })).toHaveLength(10));
    });
});
