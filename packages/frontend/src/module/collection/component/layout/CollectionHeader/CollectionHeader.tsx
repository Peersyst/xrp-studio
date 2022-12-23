import { Col, Skeleton, Typography } from "@peersyst/react-components";
import useGetCollection from "module/nft/query/useGetCollection";
import {
    CollectionCover,
    CollectionHeaderBack,
    CollectionHeaderFooter,
    CollectionHeaderRoot,
    CollectionAvatar,
} from "./CollectionHeader.styles";
import CollectionInfo from "./CollectionInfo/CollectionInfo";
import { useParams } from "react-router-dom";
import { config } from "config";

const CollectionHeader = (): JSX.Element => {
    const { id } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { header, image, name = "" } = collection || {};

    return (
        <CollectionHeaderRoot image={image} stickyTitle={name}>
            <Col gap="1.5rem">
                <CollectionCover
                    loading={collectionLoading}
                    src={header || "."}
                    alt="collection-header"
                    fallback={config.collectionDefaultHeaderUrl}
                />
                <CollectionHeaderFooter>
                    <CollectionHeaderBack />
                    <CollectionAvatar
                        loading={collectionLoading}
                        img={image || "."}
                        alt="collection-image"
                        fallback={config.collectionDefaultImageUrl}
                    />
                    <CollectionInfo />
                </CollectionHeaderFooter>
                <Skeleton loading={collectionLoading}>
                    <Typography className="collection-description" variant="body1" light>
                        {collection?.description}
                    </Typography>
                </Skeleton>
            </Col>
        </CollectionHeaderRoot>
    );
};

export default CollectionHeader;
