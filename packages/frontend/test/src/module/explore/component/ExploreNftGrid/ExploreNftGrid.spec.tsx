import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";
import { render, translate } from "test-utils";
import { NftService } from "module/api/service";
import { NftDtoMock, NftsDtoMock, PaginatedDataMock } from "test-mocks";
import { waitFor } from "@testing-library/dom";
import { screen } from "@testing-library/react";

describe("ExploreNftGrid tests", () => {
    test("Renders correctly with nfts", async () => {
        const paginatedNftDtoMock = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 10 }).nfts });
        const nftControllerGetNftsMock = jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftDtoMock);

        render(<ExploreNftGrid />);

        await waitFor(() => expect(nftControllerGetNftsMock).toHaveBeenCalled());
    });
    test("Renders correctly without nfts", async () => {
        const paginatedNftDtoMock = new PaginatedDataMock<NftDtoMock[]>({ items: new NftsDtoMock({ length: 0 }).nfts });
        const nftControllerGetNftsMock = jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftDtoMock);

        render(<ExploreNftGrid />);

        await waitFor(() => expect(nftControllerGetNftsMock).toHaveBeenCalled());
        await waitFor(() =>
            expect(screen.getByRole("heading", { name: translate("noNftsAvailable", { ns: "error" }) })).toBeInTheDocument(),
        );
    });
});
