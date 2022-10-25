import { CollectionDtoMock, CollectionsDtoMock, PaginatedDataMock, WalletMock } from "test-mocks";
import * as UseWallet from "module/wallet/component/hooks/useWallet";
import { CollectionService } from "module/api/service";
import MyCollectionsPage from "module/collection/pages/CollectionsPage";
import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/dom";

describe("Test for MyCollectionsPage", () => {
    test("Renders correctly with collections", async () => {
        const wallet = new WalletMock({ address: "0x" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<CollectionDtoMock[]>({ items: new CollectionsDtoMock({ length: 10 }).collections });
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<MyCollectionsPage />);

        expect(screen.getByRole("heading", { name: translate("myCollections") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("createCollection") })).toBeInTheDocument();
        await waitFor(() => expect(screen.getAllByText("collection_name")).toHaveLength(10));
    });
    test("Renders correctly without collections", async () => {
        const wallet = new WalletMock({ address: "0x" });
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        const data = new PaginatedDataMock<CollectionDtoMock[]>();
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<MyCollectionsPage />);

        await waitFor(() => expect(screen.getByRole("heading", { name: translate("youHaveNoCollections") })).toBeInTheDocument());
    });
});
