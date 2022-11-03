import { Col } from "@peersyst/react-components";
import BackButton from "module/common/component/navigation/BackButton/BackButton";
import useGetCollection from "module/nft/query/useGetCollection";
import { CollectionCover, CollectionHeaderFooter, CollectionHeaderRoot, ContentAvatar } from "./CollectionHeader.styles";
import CollectionInfo from "./CollectionInfo/CollectionInfo";
import { useParams } from "react-router-dom";

const CollectionHeader = (): JSX.Element => {
    const { id } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { header = "", image = "", name = "" } = collection || {};
    return (
        <CollectionHeaderRoot image={image} stickyTitle={name}>
            <Col gap="1.5rem">
                <CollectionCover loading={collectionLoading} src={header} alt="collection-header" />
                <CollectionHeaderFooter>
                    <BackButton className="collection-back" />
                    <ContentAvatar loading={collectionLoading} img={image} alt="collection-image" />
                    <CollectionInfo />
                </CollectionHeaderFooter>
            </Col>
        </CollectionHeaderRoot>
    );
};

export default CollectionHeader;
