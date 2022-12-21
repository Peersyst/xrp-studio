import { Col } from "@peersyst/react-components";
import { CollectionCoverProps } from "module/collection/component/display/CollectionCover/CollectionCover.types";
import { CollectionHeader, CollectionImage } from "module/collection/component/display/CollectionCover/CollectionCover.styles";
import { config } from "config";

const CollectionCover = ({ header = "", image = "", loading = false }: CollectionCoverProps): JSX.Element => (
    <Col css={{ width: "100%" }}>
        <CollectionHeader src={header} alt="collection-header" loading={loading} fallback={config.collectionDefaultHeaderUrl} />
        <CollectionImage img={image} alt="collection-image" loading={loading} fallback={config.collectionDefaultImageUrl} />
    </Col>
);

export default CollectionCover;
