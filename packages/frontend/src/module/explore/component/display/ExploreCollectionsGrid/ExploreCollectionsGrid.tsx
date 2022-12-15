import CollectionGrid from "module/collection/component/layout/CollectionGrid/CollectionGrid";
import useTranslate from "module/common/hook/useTranslate";
import useGetCollections from "module/collection/query/useGetCollections";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";

const ExploreCollectionsGrid = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { data, fetchNextPage, hasNextPage, isFetching } = useGetCollections();

    return (
        <CollectionGrid
            data={data}
            callback={() => fetchNextPage()}
            loading={isFetching}
            end={!hasNextPage}
            withFilters
            nothingToShow={<NothingToShow css={{ justifyContent: "flex-start" }} label={translateError("noCollectionsAvailable")} />}
        />
    );
};

export default ExploreCollectionsGrid;
