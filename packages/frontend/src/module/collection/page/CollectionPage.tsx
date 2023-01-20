import BasePage from "module/common/component/layout/BasePage/BasePage";
import CollectionContent from "../component/layout/CollectionContent/CollectionContent";
import CollectionHeader from "../component/layout/CollectionHeader/CollectionHeader";
import { useParams } from "react-router-dom";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import useGetCollectionByPath from "module/collection/query/useGetCollectionByPath";

const CollectionPage = (): JSX.Element => {
    const { path } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollectionByPath(path);

    if (!collectionLoading && !collection) return <NotFoundPage />;

    return (
        <BasePage>
            {{
                header: <CollectionHeader />,
                content: <CollectionContent />,
            }}
        </BasePage>
    );
};

export default CollectionPage;
