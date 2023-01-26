import ProfileCollections from "module/user/component/layout/ProfileCollections/ProfileCollections";
import { render, translate, waitFor } from "test-utils";
import * as Router from "react-router-dom";
import { CollectionDtoMock, CollectionsDtoMock, PaginatedDataMock } from "test-mocks";
import { CollectionService } from "module/api/service";

describe("Profile Collections test", () => {
    beforeAll(() => {
        jest.spyOn(Router, "useParams").mockReturnValue({ address: "0x" });
    });

    test("Renders correctly with collections", async () => {
        const length = 10;
        const { collections } = new CollectionsDtoMock({ length });
        const data = new PaginatedDataMock<CollectionDtoMock[]>({ items: collections });
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<ProfileCollections />);
        expect(screen.getAllByText("collection name loading")).toHaveLength(3);
        await waitFor(() => expect(screen.getAllByText(collections[0].name ?? "")).toHaveLength(length));
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(length * 2);
        expect(screen.getAllByText(translate("itemWithCount", { count: collections[0].items }))).toHaveLength(length);
        collections.forEach((collection, index) => {
            expect(imgs[index * 2]).toHaveAttribute("alt", collection.path + "-cover");
            expect(imgs[index * 2 + 1]).toHaveAttribute("alt", collection.path + "-image");
        });
    });

    test("Renders correctly without collections", async () => {
        const data = new PaginatedDataMock<CollectionDtoMock[]>({ items: [] });
        jest.spyOn(CollectionService, "collectionControllerGetCollections").mockResolvedValue(data);
        const screen = render(<ProfileCollections />);
        expect(screen.getAllByText("collection name loading")).toHaveLength(3);
        await waitFor(() =>
            expect(screen.getByRole("heading", { name: translate("userNoCollections", { ns: "error" }) })).toBeInTheDocument(),
        );
    });
});
