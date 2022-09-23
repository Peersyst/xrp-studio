import BaseNftsGridWithFilters from "module/nft/component/layout/BaseNftsGridWithFilters/BaseNftsGridWithFilters";
import { PaginatedNftsMock } from "test-mocks";
import { render, translate } from "test-utils";
import * as Recoil from "recoil";

describe("Test for the BaseNftsGridWithFilters", () => {
    test("Renders correctly", () => {
        //set true to display filters
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);
        const tags = [
            { label: "Tag1", value: 1 },
            { label: "Tag2", value: 2 },
            { label: "Tag3", value: 3 },
        ];
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        const screen = render(
            <BaseNftsGridWithFilters
                tags={tags}
                data={data}
                callback={() => undefined}
                end={false}
                loading={false}
                filters={<>filters</>}
            />,
        );
        /**
         * Filters
         */
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("filters")).toBeInTheDocument();
        /**
         * Content
         */
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
        /**
         * Tags
         */
        expect(screen.getByText("Tag1")).toBeInTheDocument();
        expect(screen.getByText("Tag2")).toBeInTheDocument();
        expect(screen.getByText("Tag3")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();
    });
    test("Renders correctly with filters closed + without tags", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        const screen = render(
            <BaseNftsGridWithFilters data={data} callback={() => undefined} end={false} loading={false} filters={<>filters</>} />,
        );
        /**
         * Filters
         */
        expect(screen.queryByText("filters")).not.toBeInTheDocument();
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
    test("Renders correctly without nfts", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 0 } });
        const screen = render(
            <BaseNftsGridWithFilters data={data} callback={() => undefined} end={false} loading={false} filters={<>filters</>} />,
        );
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });
});
