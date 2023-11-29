import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useGetDrops, { UseGetDropsOptions } from "module/drop/hook/useGetDrops";
import useDropFilters from "module/drop/hook/useDropFilters";
import DropGrid from "module/drop/component/layout/DropGrid/DropGrid";

const ExploreDropsGrid = (): JSX.Element => {
    const translateError = useTranslate("error");
    const filters: Omit<UseGetDropsOptions, "account"> = useDropFilters();
    const { data, fetchNextPage, hasNextPage, isFetching } = useGetDrops({
        account: undefined,
        isVerifiedArtist: true,
        ...filters,
    });

    return (
        <DropGrid
            data={data}
            callback={() => fetchNextPage()}
            loading={isFetching}
            end={!hasNextPage}
            withFilters
            withExtraSpace={false}
            nothingToShow={<NothingToShow css={{ justifyContent: "flex-start" }} label={translateError("noDropsAvailable")} />}
        />
    );
};

export default ExploreDropsGrid;
