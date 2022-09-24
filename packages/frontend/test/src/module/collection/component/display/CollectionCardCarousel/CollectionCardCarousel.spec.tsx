import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { CollectionsDtoMock } from "test-mocks";
import { render, translate } from "test-utils";

describe("Test for the collection card component", () => {
    test("Renders correctly when loaded", () => {
        const length = 5;
        const { collections } = new CollectionsDtoMock({ length });
        const screen = render(<CollectionCardCarousel collections={collections} isLoading={false} />);
        const imgs = screen.getAllByRole("img");
        expect(screen.getAllByText(collections[0].name ?? "")).toHaveLength(length);
        expect(imgs).toHaveLength(length * 2);
        expect(screen.getAllByText(translate("itemWithCount", { count: collections[0].items }))).toHaveLength(length);
        collections.forEach((collection, index) => {
            expect(imgs[index * 2]).toHaveAttribute("alt", "collection-" + collection.id + "-cover");
            expect(imgs[index * 2 + 1]).toHaveAttribute("alt", "collection-" + collection.id + "-image");
        });
    });
    test("Renders correctly when loading", () => {
        const length = 5;
        const { collections } = new CollectionsDtoMock({ length });
        const screen = render(<CollectionCardCarousel collections={collections} isLoading skeletonCount={length} />);
        const imgs = screen.getAllByRole("img");
        expect(screen.getAllByText("collection name loading")).toHaveLength(length);
        expect(imgs).toHaveLength(length * 2);
        expect(screen.getAllByText(translate("itemWithCount", { count: 0 }))).toHaveLength(length);
        [...Array(length)].forEach((_, index) => {
            expect(imgs[index * 2]).toHaveAttribute("alt", "collection-" + 0 + "-cover");
            expect(imgs[index * 2 + 1]).toHaveAttribute("alt", "collection-" + 0 + "-image");
        });
    });
});
