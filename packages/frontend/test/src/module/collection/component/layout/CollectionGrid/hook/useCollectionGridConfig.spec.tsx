import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { UseSearchParamsMock } from "test-mocks";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import Button from "module/common/component/input/Button/Button";
import { renderHook, translate } from "test-utils";
import { ReactNode } from "react";
import useCollectionGridConfig from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridConfig";

const renderUseCollectionGridConfig = (nothingToShow: string | ReactNode, cols: number) =>
    renderHook(() => useCollectionGridConfig({ nothingToShow, cols, withFilters: true })).result;

describe("useCollectionGridConfig tests", () => {
    const nothingToShowMock = (
        <NothingToShow>
            <Button>test</Button>
        </NothingToShow>
    );
    const colsMock = 3;

    test("Return string error when filters are active", () => {
        const mockFilters = {
            [BaseFiltersNames.QUERY]: "1",
            [BaseFiltersNames.ORDER]: "ASC",
            [NftFilterNames.COLLECTIONS]: "1",
        };
        new UseSearchParamsMock(mockFilters);

        const { current } = renderUseCollectionGridConfig(nothingToShowMock, colsMock);
        expect(current.nothingToShow).toEqual(translate("noMatchingCollections", { ns: "error" }));
    });

    test("Return param nothingToShow when filters are not active", () => {
        new UseSearchParamsMock();

        const { current } = renderUseCollectionGridConfig(nothingToShowMock, colsMock);
        expect(current.nothingToShow).toEqual(nothingToShowMock);
    });
});
