import { Button } from "@peersyst/react-components";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import DropGrid from "module/drop/component/layout/DropGrid/DropGrid";
import useGetMyDrops from "module/drop/hook/useGetMyDrops";
import { useNavigate } from "react-router-dom";

const MyDropsPageContent = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const navigate = useNavigate();

    const goToCreateCollection = () => {
        navigate(CollectionRoutes.CREATE_COLLECTION);
    };

    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyDrops();

    return (
        <PageContent>
            <DropGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                loading={isFetching}
                end={!hasNextPage}
                nothingToShow={
                    <NothingToShow label={translateError("youHaveNoDrops")}>
                        <Button onClick={goToCreateCollection}>{translate("emptyDropMessage")}</Button>
                    </NothingToShow>
                }
            />
        </PageContent>
    );
};

export default MyDropsPageContent;
