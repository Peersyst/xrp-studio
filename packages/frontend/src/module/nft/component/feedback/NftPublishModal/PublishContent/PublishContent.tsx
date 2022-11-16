import { Col, Row } from "@peersyst/react-components";
import { NftPublishContentProps } from "module/nft/component/feedback/NftPublishModal/PublishContent/PublishContent.types";
import { NftCoverImage } from "module/nft/component/display/NftCover/NftCover.styles";

const NftPublishContent = ({ cover, feedback }: NftPublishContentProps): JSX.Element => {
    const defaultCover = "";

    return (
        <Row gap={4} flex={1} breakpoint={{ width: "nftPage", alignItems: "stretch", justifyContent: "center", gap: "1.5rem" }}>
            <Col flex={1} justifyContent="center">
                <NftCoverImage src={cover ? cover : defaultCover} alt="nft-image" loading={cover === undefined} />
            </Col>
            <Col flex={1} justifyContent="center">
                {feedback}
            </Col>
        </Row>
    );
};

export default NftPublishContent;
