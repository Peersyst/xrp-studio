import PageContent from "module/common/component/layout/PageContent/PageContent";
import DropGrid from "module/drop/component/layout/DropGrid/DropGrid";
import useGetMyDrops from "module/drop/hook/useGetMyDrops";

const MyDropsPageContent = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyDrops();

    return (
        <PageContent>
            <DropGrid data={data} callback={() => fetchNextPage({ cancelRefetch: false })} loading={isFetching} end={!hasNextPage} />
        </PageContent>
    );
};

export default MyDropsPageContent;
