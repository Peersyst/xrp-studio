import PageContent from "module/common/component/layout/PageContent/PageContent";
import { useParams } from "react-router-dom";
import CollectionNftsGrid from "module/nft/component/display/CollectionNftsGrid/CollectionNftsGrid";

const CollectionContent = (): JSX.Element => {
    const { id } = useParams<string>();

    return (
        <PageContent>
            <CollectionNftsGrid id={id ? Number(id) : undefined} />
        </PageContent>
    );
};

export default CollectionContent;
