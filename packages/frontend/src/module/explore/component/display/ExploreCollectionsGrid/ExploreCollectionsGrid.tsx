import CollectionGrid from "module/collection/component/layout/CollectionGrid/CollectionGrid";
import useTranslate from "module/common/hook/useTranslate";
import useGetCollections, { UseGetCollectionsOptions } from "module/collection/query/useGetCollections";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useCollectionFilters from "module/collection/hook/useCollectionFilters";

const ExploreCollectionsGrid = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { query = "", ...restFilters }: Omit<UseGetCollectionsOptions, "account"> = useCollectionFilters();
    const { data, fetchNextPage, hasNextPage, isFetching } = useGetCollections({
        account: undefined,
        query: "%" + query,
        isVerifiedArtist: true,
        ...restFilters,
    });

    return (
        <CollectionGrid
            data={data}
            callback={() => fetchNextPage()}
            loading={isFetching}
            end={!hasNextPage}
            withFilters
            withExtraSpace={false}
            nothingToShow={<NothingToShow css={{ justifyContent: "flex-start" }} label={translateError("noCollectionsAvailable")} />}
        />
    );
};

export default ExploreCollectionsGrid;
