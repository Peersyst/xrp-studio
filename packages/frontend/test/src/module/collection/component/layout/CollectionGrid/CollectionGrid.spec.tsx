import { PaginatedCollectionMock } from "test-mocks";
import { render, translate } from "test-utils";
import CollectionGrid from "module/collection/component/layout/CollectionGrid/CollectionGrid";

describe("Test for CollectionGrid component", () => {
    test("Renders collections properly with BaseGrid", () => {
        const data = new PaginatedCollectionMock({ collectionParams: { length: 10 } });
        const screen = render(<CollectionGrid data={data} callback={() => undefined} loading={false} end={false} />);
        expect(screen.getAllByText("collection_name")).toHaveLength(10);
    });
    test("Renders no collections properly with BaseGrid", () => {
        const data = new PaginatedCollectionMock();
        const screen = render(<CollectionGrid data={data} callback={() => undefined} loading={false} end={false} />);
        expect(screen.getByRole("heading", { name: translate("noCollectionsAvailable", { ns: "error" }) })).toBeInTheDocument();
    });
});
