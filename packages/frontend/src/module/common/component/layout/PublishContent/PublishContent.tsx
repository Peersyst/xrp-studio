import { Col, Row } from "@peersyst/react-components";
import { PublishCoverImage } from "./PublishContent.styles";
import { PublishContentProps } from "./PublishContent.types";

const PublishContent = ({ children: { cover, feedback, footer } }: PublishContentProps): JSX.Element => {
    const defaultCover = ""; //TODO: implement generic default cover

    return (
        <Col>
            <Row gap={4} flex={1} breakpoint={{ width: "nftPage", alignItems: "stretch", justifyContent: "center", gap: "1.5rem" }}>
                <Col flex={1} justifyContent="center">
                    <PublishCoverImage src={cover ? cover : defaultCover} alt="nft-image" loading={cover === undefined} />
                </Col>
                <Col flex={1} justifyContent="center">
                    {feedback}
                </Col>
            </Row>
            {footer}
        </Col>
    );
};

export default PublishContent;
