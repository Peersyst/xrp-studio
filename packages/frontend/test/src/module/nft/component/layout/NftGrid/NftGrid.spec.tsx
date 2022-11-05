import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { CollectionsDtoMock, PaginatedNftsMock, UseFilterContextMock } from "test-mocks";
import { render, translate } from "test-utils";
import * as Recoil from "recoil";

describe("Test for the NftGrid component", () => {
    const contextMock = { filters: {}, setFilters: jest.fn() };
    /**
     * Tests for the NftGrid component without filters
     */
    test("Renders all nfts correctly with basegrid", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        const screen = render(<NftGrid data={data} callback={() => undefined} end={false} loadingNfts={false} />);
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
    });

    test("Renders empty grid with base grid", () => {
        const data = new PaginatedNftsMock();
        const screen = render(
            <NftGrid data={data} callback={() => undefined} end={false} loadingNfts={false} nothingToShow={"Nothing to show"} />,
        );
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });

    /**
     * Tests for the NftGrid component with filters
     */
    test("Renders correctly with grid with filters with collections to filter", () => {
        //set true to display filters
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);
        const { collections } = new CollectionsDtoMock({ length: 4 });
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        new UseFilterContextMock({ filters: { ["collections"]: [0, 1] }, setFilters: jest.fn() });
        const screen = render(
            <NftGrid
                filtersContext={contextMock}
                data={data}
                callback={() => undefined}
                end={false}
                collections={collections}
                loadingNfts={false}
            />,
        );
        /**
         * Filters
         */
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        //Collections
        expect(screen.getAllByText(collections[0].name!)).toHaveLength(6); //2 Selected Tag + 4 Filter
        /**
         * Content
         */
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
        /**
         * Tags
         */
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();
    });

    test("Renders correctly with filters closed + without tags (with grid with filters)", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        new UseFilterContextMock();
        const screen = render(
            <NftGrid
                filtersContext={contextMock}
                collections={[]}
                data={data}
                callback={() => undefined}
                end={false}
                loadingNfts={false}
            />,
        );
        /**
         * Content
         */
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
        /**
         * Tags
         */
        expect(screen.getByRole("button", { name: translate("search&Filter") })).toBeInTheDocument();
        expect(screen.getByText(translate("noneApplied"))).toBeInTheDocument();
    });

    test("Renders correctly without nfts (with grid with filters) & without collections", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 0 } });
        const screen = render(
            <NftGrid
                data={data}
                collections={[]}
                filtersContext={contextMock}
                callback={() => undefined}
                end={false}
                loadingNfts={false}
            />,
        );
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
        expect(screen.getByText(translate("withoutCollections", { ns: "error" }))).toBeInTheDocument();
    });
});
