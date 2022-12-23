import { PaginatedCollectionMock, UseSearchParamsMock } from "test-mocks";
import { render, translate } from "test-utils";
import CollectionGrid from "module/collection/component/layout/CollectionGrid/CollectionGrid";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";

describe("Test for CollectionGrid component", () => {
    test("Renders collections correctly with BaseGrid", () => {
        const data = new PaginatedCollectionMock({ collectionParams: { length: 10 } });
        const screen = render(<CollectionGrid data={data} callback={() => undefined} loading={false} end={false} />);
        expect(screen.getAllByText("collection_name")).toHaveLength(10);
    });
    test("Renders no collections correctly with BaseGrid without filters", () => {
        const data = new PaginatedCollectionMock();
        const screen = render(
            <CollectionGrid
                data={data}
                callback={() => undefined}
                loading={false}
                end={false}
                nothingToShow={<NothingToShow label={"There are no collections available at this moment"} />}
            />,
        );
        expect(screen.getByRole("heading", { name: translate("noCollectionsAvailable", { ns: "error" }) })).toBeInTheDocument();
    });

    test("Renders no collections correctly with BaseGrid with filters", () => {
        const data = new PaginatedCollectionMock();

        const mockFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };

        new UseSearchParamsMock(mockFilters);

        const screen = render(
            <CollectionGrid
                data={data}
                callback={() => undefined}
                loading={false}
                end={false}
                nothingToShow={<NothingToShow label={"There are no collections available at this moment"} />}
            />,
        );
        expect(screen.getByRole("heading", { name: translate("noMatchingCollections", { ns: "error" }) })).toBeInTheDocument();
    });
});
