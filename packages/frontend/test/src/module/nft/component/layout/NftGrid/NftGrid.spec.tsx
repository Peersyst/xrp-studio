import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { CollectionsDtoMock, PaginatedNftsMock, UseFilterMock } from "test-mocks";
import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import * as useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";

describe("Test for the NftGrid component", () => {
    /**
     * Tests for the NftGrid component without filters
     */
    test("Renders all nfts correctly with base grid", () => {
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
    test("Renders correctly with grid with filters with collections to filter", async () => {
        //set true to display filters
        new UseFilterMock<string, true>({ filter: ["0", "1"] });
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);
        const useFiltersMock = jest.spyOn(useFilters, "default").mockReturnValue({});

        const { collections } = new CollectionsDtoMock({ length: 4 });
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });

        const screen = render(
            <NftGrid withFilters data={data} callback={() => undefined} end={false} collections={collections} loadingNfts={false} />,
        );
        /**
         * Filters
         */
        expect(screen.getByText(translate("showFilters"))).toBeInTheDocument();
        //Collections
        expect(screen.getAllByText(collections[0].name!)).toHaveLength(2); //2 Selected Tag
        /**
         * Content
         */
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
        /**
         * Tags
         */
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();

        expect(useFiltersMock).toHaveBeenCalled();
    });

    test("Renders correctly with filters closed + without tags (with grid with filters)", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });

        const screen = render(
            <NftGrid withFilters collections={[]} data={data} callback={() => undefined} end={false} loadingNfts={false} />,
        );
        /**
         * Content
         */
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
        /**
         * Tags
         */
        expect(screen.getByRole("button", { name: translate("showFilters") })).toBeInTheDocument();
    });

    test("Renders correctly without nfts (with grid with filters) & without collections", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 0 } });
        const screen = render(<NftGrid data={data} collections={[]} callback={() => undefined} end={false} loadingNfts={false} />);
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });
});
