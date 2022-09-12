import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import { render } from "test-utils";
import { PaginatedDataMock, PaginatedNftsMock } from "test-mocks";
import { PaginatedNftDto } from "module/api/service";

describe("BaseNftsGrid test", () => {
    test("Renders all nfts correctly", () => {
        const data = new PaginatedNftsMock({ nftsParams: { length: 10 } });
        const screen = render(
            <BaseNftsGrid data={data} callback={() => undefined} end={false} loading={false} nothingToShow={"Nothing to show"} />,
        );
        expect(screen.getAllByRole("heading", { name: data.pages[0].items[0].metadata?.name })).toHaveLength(10);
    });
    test("Renders empty grid", () => {
        const data = new PaginatedNftsMock();
        const screen = render(
            <BaseNftsGrid data={data} callback={() => undefined} end={false} loading={false} nothingToShow={"Nothing to show"} />,
        );
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });
});
