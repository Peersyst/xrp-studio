import { Col } from "@peersyst/react-components";
import { CollectionCoverProps } from "module/collection/component/display/CollectionCover/CollectionCover.types";
import { CollectionHeader, CollectionImage } from "module/collection/component/display/CollectionCover/CollectionCover.styles";

const CollectionCover = ({ header = "", image = "", loading = false }: CollectionCoverProps): JSX.Element => (
    <Col css={{ width: "100%" }}>
        <CollectionHeader src={header} alt="collection-header" loading={loading} />
        <CollectionImage img={image} alt="collection-image" loading={loading} />
    </Col>
);

export default CollectionCover;
