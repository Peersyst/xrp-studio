import { Col, Row, Typography } from "@peersyst/react-components";
import { ImageUpIcon } from "icons";
import { uploadInputAlignItems, uploadInputJustifyContent } from "module/common/component/input/UploadInput/uploadInputAlignment";
import { UploadInputLabelAlignment } from "module/common/component/input/UploadInput/UploadInput.types";

export interface CompactUploadInputPlaceholderProps {
    label?: string;
    alignment?: UploadInputLabelAlignment;
}

const CompactUploadInputPlaceholder = ({ label, alignment }: CompactUploadInputPlaceholderProps): JSX.Element => {
    return (
        <Col
            alignItems={uploadInputAlignItems[alignment?.horizontal || "center"]}
            justifyContent={uploadInputJustifyContent[alignment?.vertical || "center"]}
            css={{ width: "100%", height: "100%" }}
        >
            <Row gap="0.75rem" alignItems="center">
                <ImageUpIcon css={{ fontSize: "1.5rem" }} />
                {label && (
                    <Typography variant="body1" fontWeight={500}>
                        {label}
                    </Typography>
                )}
            </Row>
        </Col>
    );
};

export default CompactUploadInputPlaceholder;
