import PageContent from "module/common/component/layout/PageContent/PageContent";
import { useParams } from "react-router-dom";
import CollectionNftsGrid from "module/nft/component/display/CollectionNftsGrid/CollectionNftsGrid";
import useGetCollectionByPath from "module/collection/query/useGetCollectionByPath";

const CollectionContent = (): JSX.Element => {
    const { path } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollectionByPath(path);

    return (
        <PageContent>
            <CollectionNftsGrid id={collection?.id} loading={collectionLoading} />
        </PageContent>
    );
};

export default CollectionContent;
