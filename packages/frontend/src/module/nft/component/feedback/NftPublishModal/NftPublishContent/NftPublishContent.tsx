import { Col, Row } from "@peersyst/react-components";
import { NftPublishContentProps } from "module/nft/component/feedback/NftPublishModal/NftPublishContent/NftPublishContent.types";

const NftPublishContent = ({ cover, info }: NftPublishContentProps): JSX.Element => {
    return (
        <Row gap={4} flex={1} breakpoint={{ width: "nftPage", alignItems: "stretch", justifyContent: "center", gap: "1.5rem" }}>
            <Col flex={1} justifyContent="center">
                {cover}
            </Col>
            <Col flex={1} justifyContent="center">
                {info}
            </Col>
        </Row>
    );
};

export default NftPublishContent;
