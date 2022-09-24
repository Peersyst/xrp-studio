import CollectionCardSkeleton from "module/collection/component/feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import { render, translate } from "test-utils";

describe("Test for the collection card skeleton", () => {
    test("Renders correctly", () => {
        const screen = render(<CollectionCardSkeleton />);
        expect(screen.getByText("collection name loading")).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(2);
        expect(imgs[0]).toHaveAttribute("alt", "collection-0-cover");
        expect(imgs[1]).toHaveAttribute("alt", "collection-0-image");
        expect(screen.getByText(translate("itemWithCount", { count: 0 })));
    });
});
