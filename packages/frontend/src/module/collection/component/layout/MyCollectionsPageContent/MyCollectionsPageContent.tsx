import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import { useGetMyCollections } from "module/collection/query/useGetMyCollections";
import CollectionGrid from "module/collection/component/layout/CollectionGrid/CollectionGrid";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import Button from "module/common/component/input/Button/Button";

const MyCollectionsPageContent = (): JSX.Element => {
    const t = useTranslate();
    const navigate = useNavigate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyCollections();
    return (
        <PageContent>
            <CollectionGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loading={isFetching}
                nothingToShow={
                    <NothingToShow label={t("youHaveNoCollections")}>
                        <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)}>{t("createCollection")}</Button>
                    </NothingToShow>
                }
            />
        </PageContent>
    );
};

export default MyCollectionsPageContent;
