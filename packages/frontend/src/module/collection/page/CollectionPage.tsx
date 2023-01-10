import BasePage from "module/common/component/layout/BasePage/BasePage";
import CollectionContent from "../component/layout/CollectionContent/CollectionContent";
import CollectionHeader from "../component/layout/CollectionHeader/CollectionHeader";
import { useParams } from "react-router-dom";
import useGetCollection from "module/collection/query/useGetCollection";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";

const CollectionPage = (): JSX.Element => {
    const { id } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);

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
