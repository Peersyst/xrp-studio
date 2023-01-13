import { renderHook, translate } from "test-utils";
import { ReactNode } from "react";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { UseSearchParamsMock } from "test-mocks";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import Button from "module/common/component/input/Button/Button";
import useNftGridConfig from "module/nft/component/layout/NftGrid/hook/useNftGridConfig";

const renderUseNftGridConfig = (nothingToShow: string | ReactNode) => renderHook(() => useNftGridConfig({ nothingToShow })).result;

describe("useNftNothingToShow tests", () => {
    test("Return string error when filters are active", () => {
        const mockFilters = {
            [BaseFiltersNames.QUERY]: "1",
            [BaseFiltersNames.ORDER]: "ASC",
            [NftFilterNames.COLLECTIONS]: "1",
        };
        new UseSearchParamsMock(mockFilters);
        const nothingToShowMock = (
            <NothingToShow>
                <Button>test</Button>
            </NothingToShow>
        );
        const { current } = renderUseNftGridConfig(nothingToShowMock);
        expect(current.nftNothingToShow).toEqual(translate("noMatchingNftsWithFilters", { ns: "error" }));
    });

    test("Return param nothingToShow when filters are not active", () => {
        const nothingToShowMock = (
            <NothingToShow>
                <Button>test</Button>
            </NothingToShow>
        );

        new UseSearchParamsMock();
        const { current } = renderUseNftGridConfig(nothingToShowMock);
        expect(current.nftNothingToShow).toEqual(nothingToShowMock);
    });
});
