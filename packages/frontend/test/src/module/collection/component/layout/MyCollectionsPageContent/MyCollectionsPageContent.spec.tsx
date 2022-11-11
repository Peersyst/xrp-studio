import { CollectionDtoMock, CollectionsDtoMock, PaginatedDataMock, WalletMock } from "test-mocks";
import * as UseWallet from "module/wallet/hook//useWallet";
import { CollectionService } from "module/api/service";
import { render, translate } from "test-utils";
import MyCollectionsPage from "module/collection/page/MyCollectionsPage";
import { waitFor } from "@testing-library/dom";

describe("Test for MyCollectionsPageContent", () => {
    test("Renders correctly with collections", async () => {
        const wallet = new WalletMock({ address: "0x" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<CollectionDtoMock[]>({ items: new CollectionsDtoMock({ length: 10 }).collections });
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<MyCollectionsPage />);
        await waitFor(() => expect(screen.getAllByText("collection_name")).toHaveLength(10));
    });
    test("Renders correctly without collections", async () => {
        const wallet = new WalletMock({ address: "0x" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<CollectionDtoMock[]>();
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<MyCollectionsPage />);
        await waitFor(() => expect(screen.getByRole("heading", { name: translate("youHaveNoCollections", { ns: "error" }) })));
    });
});
