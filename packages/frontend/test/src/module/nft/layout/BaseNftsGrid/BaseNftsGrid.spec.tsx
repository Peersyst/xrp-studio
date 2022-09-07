import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import { render } from "test-utils";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";

describe("BaseNftsGrid test", () => {
    test("Renders all nfts correctly", () => {
        const { nfts } = new NftsDtoMock({ length: 10 });
        const { data } = new PaginatedDataMock<NftDtoMock>({ items: nfts });
        const screen = render(
            <BaseNftsGrid data={data} callback={() => undefined} end={false} loading={false} nothingToShow={"Nothing to show"} />,
        );
        expect(screen.getAllByRole("heading", { name: nfts[0].metadata?.name })).toHaveLength(10);
    });
    test("Renders empty grid", () => {
        const { data } = new PaginatedDataMock<NftDtoMock>();
        const screen = render(
            <BaseNftsGrid data={data} callback={() => undefined} end={false} loading={false} nothingToShow={"Nothing to show"} />,
        );
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });
});
